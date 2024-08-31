import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recycler } from '../../domain/entities/recycler.entity';
import { Repository } from 'typeorm';
import { IRecyclerRepository } from '../interfaces/recycler-repository.interface';

@Injectable()
export class RecyclerRepository implements IRecyclerRepository {
  constructor(
    @InjectRepository(Recycler)
    private readonly iRecyclerRepository: Repository<Recycler>,
  ) {}

  async save(recycler: Recycler): Promise<Recycler> {
    return await this.iRecyclerRepository.save(recycler);
  }

  async findAll(): Promise<Recycler[]> {
    return await this.iRecyclerRepository.find();
  }

  async findOneById(id: string): Promise<Recycler> {
    return await this.iRecyclerRepository.findOne({
      where: { id },
      relations: ['schedulings'],
    });
  }

  async findOneByNationalIdentifier(
    nationalIdentifier: string,
  ): Promise<Recycler> {
    return await this.iRecyclerRepository.findOne({
      where: { nationalIdentifier },
      relations: ['schedulings'],
    });
  }

  async softRemove(recycler: Recycler): Promise<void> {
    await this.iRecyclerRepository.softRemove(recycler);
    this.save(recycler);
  }
}
