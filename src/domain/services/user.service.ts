import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { Address } from '../entities/address.entity';
import { UserFactory } from '../factories/user.factory';
import { IService } from '../interfaces/service.interface';
import { CreateAddressDto } from '../../application/dtos/create-address.dto';
import { IUserService } from '../interfaces/user-service.interface';
import { IUserRepository } from '../../infrastructure/interfaces/user-repository.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly iUserRepository: IUserRepository,
    @Inject('IAddressService')
    private readonly iAddressService: IService<Address, CreateAddressDto>,
  ) {}

  private async save(user: User): Promise<User> {
    return (await this.iUserRepository.save(user)) as User;
  }

  async getAll(): Promise<User[]> {
    return (await this.iUserRepository.findAll()) as User[];
  }

  async getById(id: string): Promise<User> {
    return await this.iUserRepository.findOneById(id);
  }

  async getByEmail(email: string): Promise<User> {
    return (await this.iUserRepository.findOneByEmail(email)) as User;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const address = await this.iAddressService.create(
      createUserDto.createAddressDto,
    );
    try {
      const user = UserFactory.create(createUserDto, address);
      return await this.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't create user. Internal server error: ${error}`,
      );
    }
  }

  async softRemove(id: string): Promise<void> {
    const user = await this.getById(id);
    if (!user)
      throw new NotFoundException(`No user found with the given id ${id}`);

    try {
      await this.iUserRepository.softRemove(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't soft delete user. Internal server error: ${error}`,
      );
    }
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    const user = await this.getById(id);
    if (!user)
      throw new NotFoundException(`No user found with the given id ${id}`);

    try {
      const modifiableFields = ['name', 'address'];
      Object.keys(updates).forEach((key) => {
        if (modifiableFields.includes(key)) {
          user[key] = updates[key].toUpperCase();
        }
      });
      return await this.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't update user. Internal server error: ${error}`,
      );
    }
  }
}
