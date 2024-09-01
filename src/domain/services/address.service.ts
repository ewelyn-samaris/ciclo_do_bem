import { Inject, Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { GeoLocationService } from '../../infrastructure/geo-location.service';
import { Point } from '../enums/point.enum';
import { CreateAddressDto } from '../../application/dtos/create-address.dto';
import { AddressFactory } from '../factories/address.factory';
import { IRepository } from '../../infrastructure/interfaces/repository.interface';
import { Address } from '../entities/address.entity';
import { IService } from '../interfaces/service.interface';

@Injectable()
export class AddressService implements IService<Address, CreateAddressDto> {
  constructor(
    @Inject('IAddressRepository')
    private readonly addressRepository: IRepository<Address>,
    @Inject('IGeoLocationService')
    private readonly geoLocationService: GeoLocationService,
  ) {}

  private async save(address: Address) {
    return await this.addressRepository.save(address);
  }

  async getAll(): Promise<Address[]> {
    return await this.addressRepository.findAll();
  }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const point: Point = await this.geoLocationService.getCoordinatesByZipCode(
      createAddressDto.zipCode,
    );

    try {
      const address = AddressFactory.create(createAddressDto, point);
      return await this.save(address);
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't create address for user. Internal server error: ${error}`,
      );
    }
  }
}
