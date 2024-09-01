import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateRecyclerDto {
  @IsNotEmpty({ message: `Data must be provided: cpf` })
  @IsString({ message: `Invalid Data type: cpf` })
  @Matches(/^\d{11}$/, { message: `Invalid Cpf` })
  @ApiProperty({ example: '75866563045', description: `Recycler's CPF` })
  nationalIdentifier: string;

  @IsNotEmpty({ message: `Data must be provided: name` })
  @IsString({ message: `Invalid data type: name` })
  @Matches(/^[A-Za-z]{2,}(?: [A-Za-z]+)+$/, { message: `Invalid name` })
  @ApiProperty({ example: 'Leandro Moura', description: `Recycler's name` })
  name: string;

  @IsNotEmpty({ message: `Data must be provided: company` })
  @IsString({ message: `Invalid data type: company` })
  @ApiProperty({
    example: 'Catar SA',
    description: `Company's name that the recycler is associated with`,
  })
  company: string;
}
