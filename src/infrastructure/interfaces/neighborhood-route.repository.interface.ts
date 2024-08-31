import { NeighborhoodRoute } from '../../domain/entities/neighborhood-route.entity';
import { IRepository } from './repository.interface';
import { UserSchedulingParams } from '../../domain/models/user-scheduling-params.model';

export interface INeighborhoodRouteRepository
  extends IRepository<NeighborhoodRoute> {
  findByDayShiftNeighborhood(
    userSchedulingParams: UserSchedulingParams,
  ): Promise<NeighborhoodRoute>;
}
