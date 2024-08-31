import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from '../enums/point.enum';
import { CreateAddressDto } from '../../application/dtos/create-address.dto';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zipcode: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column({ nullable: true })
  complement?: string;

  @Column({ nullable: true })
  point?: Point;

  constructor(createAddressDto?: CreateAddressDto, point?: Point) {
    if (createAddressDto) {
      this.zipcode = createAddressDto.zipCode;
      this.state = createAddressDto.state.toUpperCase();
      this.city = createAddressDto.city.toUpperCase();
      this.neighborhood = createAddressDto.neighborhood.toUpperCase();
      this.street = createAddressDto.street.toUpperCase();
      this.streetNumber = createAddressDto.streetNumber;
      this.complement = createAddressDto.complement.toUpperCase() ?? null;
    }
    if (point) this.point = point ?? null;
  }
}
