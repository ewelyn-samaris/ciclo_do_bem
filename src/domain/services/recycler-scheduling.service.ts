import { Inject, Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { RecyclerScheduling } from '../entities/recycler-scheduling.entity';
import { CreateSchedulingDto } from '../../application/dtos/create-scheduling.dto';
import { SchedulingFactory } from '../factories/scheduling.factory';
import { IRecyclerService } from '../interfaces/recycler-service.interface';
import { IRecyclerSchedulingService } from '../interfaces/recycler-scheduling-service.interface';
import { IRecyclerSchedulingRepository } from '../../infrastructure/interfaces/recycler-scheduling-repository.interface';
import { UserSchedulingParams } from '../models/user-scheduling-params.model';

@Injectable()
export class RecyclerSchedulingService implements IRecyclerSchedulingService {
  constructor(
    @Inject('IRecyclerSchedulingRepository')
    private readonly iRecyclerSchedulingRepository: IRecyclerSchedulingRepository,
    @Inject('IRecyclerService')
    private readonly iRecyclerService: IRecyclerService,
  ) {}

  private async save(
    recyclerScheduling: RecyclerScheduling,
  ): Promise<RecyclerScheduling> {
    return await this.iRecyclerSchedulingRepository.save(recyclerScheduling);
  }

  async getAll(): Promise<RecyclerScheduling[]> {
    return await this.iRecyclerSchedulingRepository.findAll();
  }

  async getByDayShiftNeighborhood(
    params: UserSchedulingParams,
  ): Promise<RecyclerScheduling[]> {
    return await this.iRecyclerSchedulingRepository.findByDayShiftNeighborhood(
      params,
    );
  }

  async create(
    recyclerSchedulingDto: CreateSchedulingDto,
    recyclerId: string,
  ): Promise<RecyclerScheduling> {
    try {
      const recycler = await this.iRecyclerService.getById(recyclerId);
      const recyclerScheduling = SchedulingFactory.create(
        recyclerSchedulingDto,
        recycler,
      );
      return await this.save(recyclerScheduling as RecyclerScheduling);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't create recycler schedule. Internal server error: ${error}`,
      );
    }
  }

  getNeighborhoodsServed(): Promise<{ city: string; neighborhood: string }[]> {
    return this.iRecyclerSchedulingRepository.findNeighborhoodsServeds();
  }
}
