import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { IService } from './service.interface';

export interface IUserService extends IService<User, CreateUserDto> {
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  softRemove(id: string): Promise<void>;
  update(id: string, updates: Partial<User>): Promise<User>;
}
