import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { DayOfWeek } from '../../domain/enums/day-of-week.enum';
import { SchedulingType } from '../../domain/enums/scheduling-type.enum';
import { WorkShift } from '../../domain/enums/work-shift.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchedulingDto {
  @IsNotEmpty({ message: `Data must be provided: day` })
  @IsEnum(DayOfWeek, { message: `Invalid data type: day` })
  @ApiProperty({ example: 'MONDAY', description: 'Day of the week' })
  day: DayOfWeek;

  @IsNotEmpty({ message: `Data must be provided: shift` })
  @IsEnum(WorkShift, { message: `Invalid data type: shift` })
  @ApiProperty({ example: 'MORNING', description: 'Shift of the day' })
  shift: WorkShift;

  @IsNotEmpty({ message: `Data must be provided: type` })
  @IsEnum(SchedulingType, { message: `Invalid data type: type` })
  @ApiProperty({ example: 'USER_SCHEDULING', description: 'Scheduling type' })
  type: SchedulingType;

  @ValidateIf((obj) => obj.type === SchedulingType.RECYCLER)
  @IsNotEmpty({ message: `Data must be provided: city` })
  @IsString({ message: `Invalid data type: city` })
  @ApiProperty({ example: 'Recife', description: 'City name' })
  city: string;

  @ValidateIf((obj) => obj.type === SchedulingType.RECYCLER)
  @IsNotEmpty({ message: `Data must be provided: neighborhood` })
  @IsString({ message: `Invalid data type: neighborhood` })
  @ApiProperty({ example: 'Areias', description: 'Neighborhood name' })
  neighborhood: string;

  @ValidateIf((obj) => obj.type === SchedulingType.USER)
  @IsOptional()
  @IsNotEmpty({ message: `Data must be provided: note` })
  @IsString({ message: `Invalid data type: note` })
  @ApiProperty({
    example: 'Passar até às 10h',
    description: 'Aditional information',
  })
  note?: string;
}
