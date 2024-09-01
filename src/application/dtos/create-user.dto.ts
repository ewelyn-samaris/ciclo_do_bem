import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: `Data must be provided: name` })
  @IsString({ message: `Invalid data type: name` })
  @Matches(/^[A-Za-z]{2,}(?: [A-Za-z]+)+$/, { message: `Invalid name` })
  @ApiProperty({ example: 'Eduarda da Silva', description: 'User name' })
  name: string;

  @IsNotEmpty({ message: `Data must be provided: email` })
  @IsString({ message: `Invalid data type: email` })
  @IsEmail({}, { message: `Invalid email` })
  @ApiProperty({ example: 'duda@example.com', description: 'User email' })
  email: string;

  @IsNotEmpty({ message: `Data must be provided: address` })
  @ApiProperty({ type: CreateAddressDto, description: 'User address data' })
  createAddressDto: CreateAddressDto;
}
