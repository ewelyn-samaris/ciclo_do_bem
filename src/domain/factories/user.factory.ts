import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { Address } from '../entities/address.entity';
import { User } from '../entities/user.entity';

export abstract class UserFactory {
  static create(createUserDto: CreateUserDto, address: Address): User {
    return new User(createUserDto, address);
  }
}
