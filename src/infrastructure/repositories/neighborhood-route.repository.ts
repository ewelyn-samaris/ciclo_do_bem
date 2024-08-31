import { InjectRepository } from '@nestjs/typeorm';
import { INeighborhoodRouteRepository } from '../interfaces/neighborhood-route.repository.interface';
import { NeighborhoodRoute } from '../../domain/entities/neighborhood-route.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserSchedulingParams } from '../../domain/models/user-scheduling-params.model';

@Injectable()
export class NeighborhoodRouteRepository
  implements INeighborhoodRouteRepository
{
  constructor(
    @InjectRepository(NeighborhoodRoute)
    private readonly iNeighborhoodRouteRepository: Repository<NeighborhoodRoute>,
  ) {}

  async findAll(): Promise<NeighborhoodRoute[]> {
    return await this.iNeighborhoodRouteRepository.find({
      relations: ['usersSchedulings'],
    });
  }

  async findByDayShiftNeighborhood(
    params: UserSchedulingParams,
  ): Promise<NeighborhoodRoute> {
    return await this.iNeighborhoodRouteRepository.findOne({
      where: {
        day: params.day,
        shift: params.shift,
        city: params.city,
        neighborhood: params.neighborhood,
      },
      relations: ['usersSchedulings'],
    });
  }

  async save(
    neighboorhoodRoute: NeighborhoodRoute,
  ): Promise<NeighborhoodRoute> {
    return await this.iNeighborhoodRouteRepository.save(neighboorhoodRoute);
  }
}
