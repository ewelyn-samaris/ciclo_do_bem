import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserScheduling } from '../entities/user-scheduling.entity';
import { CreateSchedulingDto } from '../../application/dtos/create-scheduling.dto';
import { SchedulingFactory } from '../factories/scheduling.factory';
import { IUserService } from '../interfaces/user-service.interface';
import { IUserSchedulingService } from '../interfaces/user-scheduling-service.interface';
import { IUserSchedulingRepository } from '../../infrastructure/interfaces/user-scheduling.repository';
import { UserSchedulingParams } from '../models/user-scheduling-params.model';

@Injectable()
export class UserSchedulingService implements IUserSchedulingService {
  constructor(
    @Inject('IUserSchedulingRepository')
    private readonly iUserSchedulingRepository: IUserSchedulingRepository,
    @Inject('IUserService') private readonly iUserService: IUserService,
  ) {}

  async save(userScheduling: UserScheduling): Promise<UserScheduling> {
    return await this.iUserSchedulingRepository.save(userScheduling);
  }

  async getAll(): Promise<UserScheduling[]> {
    return await this.iUserSchedulingRepository.findAll();
  }

  async getById(id: string): Promise<UserScheduling> {
    return await this.iUserSchedulingRepository.findOneById(id);
  }

  async create(
    createUserSchedulingDto: CreateSchedulingDto,
    userId: string,
  ): Promise<UserScheduling> {
    try {
      const user = await this.iUserService.getById(userId);
      const userScheduling = SchedulingFactory.create(
        createUserSchedulingDto,
        user,
      );
      return await this.save(userScheduling as UserScheduling);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't create user-scheduling. Internal server error: ${error}`,
      );
    }
  }

  async updateServedScheduling(id: string): Promise<UserScheduling> {
    const userScheduling = await this.getById(id);
    if (!userScheduling) {
      throw new NotFoundException(
        `No user-scheduling found for the given id #${id}`,
      );
    }
    try {
      userScheduling.served = true;
      return await this.save(userScheduling);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't register user-scheduling as served. Internal server error: ${error}`,
      );
    }
  }

  async getByDayShiftNeighborhood(
    userSchedulingParams: UserSchedulingParams,
  ): Promise<UserScheduling[]> {
    return await this.iUserSchedulingRepository.findByDayShiftNeighborhood(
      userSchedulingParams,
    );
  }
}
