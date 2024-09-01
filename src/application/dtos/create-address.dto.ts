import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: `Data must be provided: cep` })
  @IsString({ message: `Invalid data type: cep` })
  @ApiProperty({ example: '50870800', description: 'CEP' })
  zipCode: string;

  @IsNotEmpty({ message: `Data must be provided: state` })
  @IsString({ message: `Invalid data type: state` })
  @ApiProperty({ example: 'PE', description: 'State abbreviation' })
  state: string;

  @IsNotEmpty({ message: `Data must be provided: city` })
  @IsString({ message: `Invalid data type: city` })
  @ApiProperty({ example: 'Recife', description: 'City name' })
  city: string;

  @IsNotEmpty({ message: `Data must be provided: neighborhood` })
  @IsString({ message: `Invalid data type: neighborhood` })
  @ApiProperty({ example: 'Areias', description: 'Neighborhood name' })
  neighborhood: string;

  @IsNotEmpty({ message: `Data must be provided: street` })
  @IsString({ message: `Invalid data type: street` })
  @ApiProperty({ example: 'Av. Recife', description: 'Street name' })
  street: string;

  @IsNotEmpty({ message: `Data must be provided: streetNumber` })
  @IsString({ message: `Invalid data type: streetNumber` })
  @ApiProperty({ example: '123', description: 'Street number' })
  streetNumber: string;

  @IsOptional()
  @IsString({ message: `Invalid data type: complement` })
  @ApiProperty({
    example: 'Casa A, 1º Andar',
    description: 'Address Complement',
  })
  complement?: string;
}
