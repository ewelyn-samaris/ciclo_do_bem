import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { NeighborhoodRoute } from '../entities/neighborhood-route.entity';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { WorkShift } from '../enums/work-shift.enum';
import { INeighborhoodRouteService } from '../interfaces/neighborhood-route-service.interface';
import { INeighborhoodRouteRepository } from '../../infrastructure/interfaces/neighborhood-route.repository.interface';
import { CreateNeighborhoodRoute } from '../models/create-neighborhood-route.model';
import { NeighborhoodRouteFactory } from '../factories/neighborhoodRoute.factory';
import { IRecyclerSchedulingService } from '../interfaces/recycler-scheduling-service.interface';
import { IUserSchedulingService } from '../interfaces/user-scheduling-service.interface';
import { UserSchedulingParams } from '../models/user-scheduling-params.model';
import { UserScheduling } from '../entities/user-scheduling.entity';

@Injectable()
export class NeighborhoodRouteService implements INeighborhoodRouteService {
  constructor(
    @Inject('INeighborhoodRouteRepository')
    private readonly iNeighborhoodRouteRepository: INeighborhoodRouteRepository,
    @Inject('IRecyclerSchedulingService')
    private readonly recyclerSchedulingService: IRecyclerSchedulingService,
    @Inject('IUserSchedulingService')
    private readonly iuserSchedulingService: IUserSchedulingService,
  ) {}

  private getDayAsDayOfWeek(): DayOfWeek {
    return new Date()
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toUpperCase() as DayOfWeek;
  }

  async getByDayShiftNeighborhood(
    userSchedulingParams: UserSchedulingParams,
  ): Promise<NeighborhoodRoute> {
    try {
      userSchedulingParams.neighborhood =
        userSchedulingParams.neighborhood.toUpperCase();
      userSchedulingParams.city = userSchedulingParams.city.toUpperCase();
      const route =
        await this.iNeighborhoodRouteRepository.findByDayShiftNeighborhood(
          userSchedulingParams,
        );
      if (!route) {
        throw new NotFoundException(
          `No route found for the given params: ${JSON.stringify(
            userSchedulingParams,
          )}`,
        );
      }
      return route;
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't get neighborhood route. Internal server error: ${error}`,
      );
    }
  }

  async getAll(): Promise<NeighborhoodRoute[]> {
    try {
      const routes = await this.iNeighborhoodRouteRepository.findAll();
      if (!routes.length) {
        throw new NotFoundException('No routes found');
      }
      return routes;
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't get neighborhoods routes. Internal server error: ${error}`,
      );
    }
  }

  async getNeighborhoodsServed(): Promise<
    { city: string; neighborhood: string }[]
  > {
    const servedAreas =
      await this.recyclerSchedulingService.getNeighborhoodsServed();
    if (!servedAreas) {
      throw new NotFoundException('No neighborhood served found');
    }
    return servedAreas;
  }

  async create(
    createNeighboorhoodRoute: CreateNeighborhoodRoute,
  ): Promise<NeighborhoodRoute> {
    try {
      const neighborhoodRoute = NeighborhoodRouteFactory.create(
        createNeighboorhoodRoute,
      );
      return await this.iNeighborhoodRouteRepository.save(neighborhoodRoute);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't create neighborhood-route. Internal server error: ${error}`,
      );
    }
  }

  private async turnServedFalse(
    userSchedulings: UserScheduling[],
  ): Promise<void> {
    for (const userScheduling of userSchedulings) {
      userScheduling.served = false;
      await this.iuserSchedulingService.save(userScheduling);
    }
  }

  async getRoutesByShift(shift: WorkShift): Promise<CreateNeighborhoodRoute[]> {
    const neighborhoodServeds = await this.getNeighborhoodsServed();
    const day: DayOfWeek = this.getDayAsDayOfWeek();

    const shiftRoute: Promise<CreateNeighborhoodRoute>[] =
      neighborhoodServeds.map(async (neighborhoodServed) => {
        const { city, neighborhood } = neighborhoodServed;
        const userSchedulingParams = {
          day,
          shift,
          city,
          neighborhood,
        };

        const usersSchedulings =
          await this.iuserSchedulingService.getByDayShiftNeighborhood(
            userSchedulingParams,
          );

        if (usersSchedulings.length) {
          await this.turnServedFalse(usersSchedulings);
          return {
            day,
            shift,
            city,
            neighborhood,
            usersSchedulings,
          };
        }
      });
    return await Promise.all(shiftRoute);
  }
}
