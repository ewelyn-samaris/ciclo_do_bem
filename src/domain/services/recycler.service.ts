import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { Recycler } from '../entities/recycler.entity';
import { CreateRecyclerDto } from '../../application/dtos/create-recycler.dto';
import { RecyclerFactory } from '../factories/recycler.factory';
import { IRecyclerService } from '../interfaces/recycler-service.interface';
import { IRecyclerRepository } from '../../infrastructure/interfaces/recycler-repository.interface';

@Injectable()
export class RecyclerService implements IRecyclerService {
  constructor(
    @Inject('IRecyclerRepository')
    private readonly iRecyclerRepository: IRecyclerRepository,
  ) {}

  private async save(recycler: Recycler): Promise<Recycler> {
    return await this.iRecyclerRepository.save(recycler);
  }

  async getAll(): Promise<Recycler[]> {
    try {
      const recyclers = await this.iRecyclerRepository.findAll();
      if (!recyclers.length) {
        throw new NotFoundException('No recyclers found');
      }
      return recyclers;
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't get recyclers. Internal server error: ${error}`,
      );
    }
  }

  async getById(id: string): Promise<Recycler> {
    return (await this.iRecyclerRepository.findOneById(id)) as Recycler;
  }

  async getByNationalIdentifier(nationalIdentifier: string): Promise<Recycler> {
    return await this.iRecyclerRepository.findOneByNationalIdentifier(
      nationalIdentifier,
    );
  }

  async create(createRecyclerDto: CreateRecyclerDto): Promise<Recycler> {
    try {
      const recycler = RecyclerFactory.create(createRecyclerDto);
      return await this.save(recycler);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't create recycler. Internal server error: ${error}`,
      );
    }
  }

  async softDelete(id: string): Promise<void> {
    const recycler = await this.getById(id);
    if (!recycler)
      throw new NotFoundException(`No recycler found with the given id ${id}`);
    try {
      await this.iRecyclerRepository.softRemove(recycler);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't soft delete recycler. Internal server error: ${error}`,
      );
    }
  }
}
