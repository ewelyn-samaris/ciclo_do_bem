import { IService } from './service.interface';
import { Recycler } from '../entities/recycler.entity';
import { CreateRecyclerDto } from '../../application/dtos/create-recycler.dto';

export interface IRecyclerService
  extends IService<Recycler, CreateRecyclerDto> {
  getById(id: string): Promise<Recycler>;
  getByNationalIdentifier(nationalId: string): Promise<Recycler>;
  softDelete(id: string): Promise<void>;
}
