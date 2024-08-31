import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecyclerScheduling } from '../../domain/entities/recycler-scheduling.entity';
import { IRepository } from '../interfaces/repository.interface';
import { Repository } from 'typeorm';
import { UserSchedulingParams } from '../../domain/models/user-scheduling-params.model';

@Injectable()
export class RecyclerSchedulingRepository
  implements IRepository<RecyclerScheduling>
{
  constructor(
    @InjectRepository(RecyclerScheduling)
    private readonly iRecyclerSchedulingRepository: Repository<RecyclerScheduling>,
  ) {}

  async save(
    recyclerScheduling: RecyclerScheduling,
  ): Promise<RecyclerScheduling> {
    return await this.iRecyclerSchedulingRepository.save(recyclerScheduling);
  }

  async findAll(): Promise<RecyclerScheduling[]> {
    return await this.iRecyclerSchedulingRepository.find();
  }

  async findByDayShiftNeighborhood(
    params: UserSchedulingParams,
  ): Promise<RecyclerScheduling[]> {
    return await this.iRecyclerSchedulingRepository.find({
      where: {
        day: params.day,
        shift: params.shift,
        city: params.city,
        neighborhood: params.neighborhood,
      },
    });
  }

  async findNeighborhoodsServeds(): Promise<
    { city: string; neighborhood: string }[]
  > {
    const schedulings = await this.findAll();
    const neighborhoodServeds: { city: string; neighborhood: string }[] = [];
    const neighborhoodServedsSet = new Set<string>();

    schedulings.forEach((scheduling) => {
      const key = `${scheduling.city}--${scheduling.neighborhood}`;
      if (!neighborhoodServedsSet.has(key)) {
        neighborhoodServedsSet.add(key);
        neighborhoodServeds.push({
          city: scheduling.city,
          neighborhood: scheduling.neighborhood,
        });
      }
    });
    return neighborhoodServeds;
  }
}
