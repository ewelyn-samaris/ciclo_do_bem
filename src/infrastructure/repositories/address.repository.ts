import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../../domain/entities/address.entity';
import { IRepository } from '../interfaces/repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AddressRepository implements IRepository<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly iAddressRepository: Repository<Address>,
  ) {}

  async save(address: Address): Promise<Address> {
    return await this.iAddressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    return await this.iAddressRepository.find();
  }

  async findByNeighborhood(
    neighborhood: string,
    city: string,
  ): Promise<Address[]> {
    return await this.iAddressRepository.find({
      where: { neighborhood, city },
    });
  }
}
