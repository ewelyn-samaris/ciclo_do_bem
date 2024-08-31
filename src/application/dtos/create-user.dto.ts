import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: `Data must be provided: name` })
  @IsString({ message: `Invalid data type: name` })
  @Matches(/^[A-Za-z]{2,}(?: [A-Za-z]+)+$/, { message: `Invalid name` })
  name: string;

  @IsNotEmpty({ message: `Data must be provided: email` })
  @IsString({ message: `Invalid data type: email` })
  @IsEmail({}, { message: `Invalid email` })
  email: string;

  @IsNotEmpty({ message: `Data must be provided: address` })
  createAddressDto: CreateAddressDto;
}
