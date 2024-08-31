import { CreateAddressDto } from '../../application/dtos/create-address.dto';
import { Address } from '../entities/address.entity';
import { Point } from '../enums/point.enum';

export abstract class AddressFactory {
  static create(createAddressDto: CreateAddressDto, point: Point): Address {
    return new Address(createAddressDto, point);
  }
}
