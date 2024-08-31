import { CreateSchedulingDto } from '../../application/dtos/create-scheduling.dto';
import { IService } from './service.interface';
import { RecyclerScheduling } from '../entities/recycler-scheduling.entity';
import { UserSchedulingParams } from '../models/user-scheduling-params.model';

export interface IRecyclerSchedulingService
  extends IService<RecyclerScheduling, CreateSchedulingDto> {
  getNeighborhoodsServed(): Promise<{ city: string; neighborhood: string }[]>;
  getByDayShiftNeighborhood(
    params: UserSchedulingParams,
  ): Promise<RecyclerScheduling[]>;
}
