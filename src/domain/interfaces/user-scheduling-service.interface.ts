import { CreateSchedulingDto } from '../../application/dtos/create-scheduling.dto';
import { UserScheduling } from '../entities/user-scheduling.entity';
import { UserSchedulingParams } from '../models/user-scheduling-params.model';
import { IService } from './service.interface';

export interface IUserSchedulingService
  extends IService<UserScheduling, CreateSchedulingDto> {
  save(userScheduling: UserScheduling): Promise<UserScheduling>;
  updateServedScheduling(id: string): Promise<UserScheduling>;
  getByDayShiftNeighborhood(
    userSchedulingParams: UserSchedulingParams,
  ): Promise<UserScheduling[]>;
}
