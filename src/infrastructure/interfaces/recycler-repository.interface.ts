import { IRepository } from './repository.interface';
import { Recycler } from '../../domain/entities/recycler.entity';

export interface IRecyclerRepository extends IRepository<Recycler> {
  findOneById(id: string): Promise<Recycler>;
  findOneByNationalIdentifier(nationalId: string): Promise<Recycler>;
  softRemove(recycler: Recycler): Promise<void>;
}
