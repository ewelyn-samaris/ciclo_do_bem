import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserScheduling } from '../../domain/entities/user-scheduling.entity';
import { Repository } from 'typeorm';
import { IUserSchedulingRepository } from '../interfaces/user-scheduling.repository';
import { UserSchedulingParams } from '../../domain/models/user-scheduling-params.model';

@Injectable()
export class UserSchedulingRepository implements IUserSchedulingRepository {
  constructor(
    @InjectRepository(UserScheduling)
    private readonly iUserSchedulingRepository: Repository<UserScheduling>,
  ) {}

  async save(userScheduling: UserScheduling): Promise<UserScheduling> {
    return await this.iUserSchedulingRepository.save(userScheduling);
  }

  async findAll(): Promise<UserScheduling[]> {
    return await this.iUserSchedulingRepository.find();
  }

  async findOneById(id: string): Promise<UserScheduling> {
    return await this.iUserSchedulingRepository.findOneBy({ id });
  }

  async findByDayShiftNeighborhood(
    userSchedulingParams: UserSchedulingParams,
  ): Promise<UserScheduling[]> {
    return await this.iUserSchedulingRepository.find({
      where: {
        day: userSchedulingParams.day,
        shift: userSchedulingParams.shift,
        user: {
          address: {
            city: userSchedulingParams.city,
            neighborhood: userSchedulingParams.neighborhood,
          },
        },
      },
    });
  }
}
