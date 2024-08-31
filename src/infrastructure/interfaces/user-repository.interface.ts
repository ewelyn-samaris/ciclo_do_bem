import { User } from '../../domain/entities/user.entity';
import { IRepository } from './repository.interface';

export interface IUserRepository extends IRepository<User> {
  findOneById(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  softRemove(user: User): Promise<void>;
}
