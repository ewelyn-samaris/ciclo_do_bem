import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { WorkShift } from '../enums/work-shift.enum';
import { INeighborhoodRouteService } from '../interfaces/neighborhood-route-service.interface';
import { CreateNeighborhoodRoute } from '../models/create-neighborhood-route.model';

@Injectable()
export class RouteJobCreator {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @Inject('INeighborhoodRouteService')
    private readonly iNeighborhoodRouteService: INeighborhoodRouteService,
  ) {}

  private readonly logger = new Logger(RouteJobCreator.name);

  @Cron('0 0 3 * * 1-6', { name: 'create-routes' })
  async createNeighborhoodRoutes() {
    console.log('***** Iniciando JOB: create-routes *****');
    this.logger.debug('Called at 03:00 am on every day-of-week');

    const dayRoutes: CreateNeighborhoodRoute[] =
      await this.iNeighborhoodRouteService.getRoutesByShift(WorkShift.MORNING);

    dayRoutes.push(
      ...(await this.iNeighborhoodRouteService.getRoutesByShift(
        WorkShift.AFTERNOON,
      )),
    );

    for (const dayRoute of dayRoutes) {
      await this.iNeighborhoodRouteService.create(dayRoute);
    }
  }
}
