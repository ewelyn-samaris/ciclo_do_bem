import { RecyclerScheduling } from '../../domain/entities/recycler-scheduling.entity';
import { IRepository } from './repository.interface';
import { UserSchedulingParams } from '../../domain/models/user-scheduling-params.model';

export interface IRecyclerSchedulingRepository
  extends IRepository<RecyclerScheduling> {
  findNeighborhoodsServeds(): Promise<{ city: string; neighborhood: string }[]>;
  findByDayShiftNeighborhood(
    params: UserSchedulingParams,
  ): Promise<RecyclerScheduling[]>;
}
