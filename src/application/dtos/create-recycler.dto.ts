import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateRecyclerDto {
  @IsNotEmpty({ message: `Data must be provided: cpf` })
  @IsString({ message: `Invalid Data type: cpf` })
  @Matches(/^\d{11}$/, { message: `Invalid Cpf` })
  nationalIdentifier: string;

  @IsNotEmpty({ message: `Data must be provided: name` })
  @IsString({ message: `Invalid data type: name` })
  @Matches(/^[A-Za-z]{2,}(?: [A-Za-z]+)+$/, { message: `Invalid name` })
  name: string;

  @IsNotEmpty({ message: `Data must be provided: company` })
  @IsString({ message: `Invalid data type: company` })
  company: string;
}
