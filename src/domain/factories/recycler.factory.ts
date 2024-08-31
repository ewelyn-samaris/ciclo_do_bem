import { CreateRecyclerDto } from '../../application/dtos/create-recycler.dto';
import { Recycler } from '../entities/recycler.entity';

export abstract class RecyclerFactory {
  static create(createRecyclerDto: CreateRecyclerDto): Recycler {
    return new Recycler(createRecyclerDto);
  }
}
