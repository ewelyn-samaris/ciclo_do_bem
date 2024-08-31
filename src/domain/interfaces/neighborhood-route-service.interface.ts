import { CreateNeighborhoodRoute } from '../models/create-neighborhood-route.model';
import { NeighborhoodRoute } from '../entities/neighborhood-route.entity';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { WorkShift } from '../enums/work-shift.enum';
import { IService } from './service.interface';
import { UserSchedulingParams } from '../models/user-scheduling-params.model';

export interface INeighborhoodRouteService
  extends IService<NeighborhoodRoute, CreateNeighborhoodRoute> {
  getByDayShiftNeighborhood(
    userSchedulingParams: UserSchedulingParams,
  ): Promise<NeighborhoodRoute>;
  getAll(): Promise<NeighborhoodRoute[]>;
  create(
    createNeighboorhoodRoute: CreateNeighborhoodRoute,
  ): Promise<NeighborhoodRoute>;
  getRoutesByShift(shift: WorkShift): Promise<CreateNeighborhoodRoute[]>;
}
