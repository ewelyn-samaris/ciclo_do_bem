import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: `Data must be provided: cep` })
  @IsString({ message: `Invalid data type: cep` })
  zipCode: string;

  @IsNotEmpty({ message: `Data must be provided: state` })
  @IsString({ message: `Invalid data type: state` })
  state: string;

  @IsNotEmpty({ message: `Data must be provided: city` })
  @IsString({ message: `Invalid data type: city` })
  city: string;

  @IsNotEmpty({ message: `Data must be provided: neighborhood` })
  @IsString({ message: `Invalid data type: neighborhood` })
  neighborhood: string;

  @IsNotEmpty({ message: `Data must be provided: street` })
  @IsString({ message: `Invalid data type: street` })
  street: string;

  @IsNotEmpty({ message: `Data must be provided: streetNumber` })
  @IsString({ message: `Invalid data type: streetNumber` })
  streetNumber: string;

  @IsOptional()
  @IsString({ message: `Invalid data type: complement` })
  complement?: string;
}
