import { UserScheduling } from '../../domain/entities/user-scheduling.entity';
import { IRepository } from './repository.interface';
import { UserSchedulingParams } from '../../domain/models/user-scheduling-params.model';

export interface IUserSchedulingRepository extends IRepository<UserScheduling> {
  findByDayShiftNeighborhood(
    userSchedulingParams: UserSchedulingParams,
  ): Promise<UserScheduling[]>;
  findOneById(id: string): Promise<UserScheduling>;
}
