import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly iUserRepository: Repository<User>,
  ) {}

  async save(user: User): Promise<User> {
    return await this.iUserRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.iUserRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    return await this.iUserRepository.findOne({
      where: { id },
      relations: ['scheduling'],
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.iUserRepository.findOne({
      where: { email },
      relations: ['scheduling'],
    });
  }

  async softRemove(user: User): Promise<void> {
    await this.iUserRepository.softRemove(user);
    this.save(user);
  }
}
