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

export class CreateSchedulingDto {
  @IsNotEmpty({ message: `Data must be provided: day` })
  @IsEnum(DayOfWeek, { message: `Invalid data type: day` })
  day: DayOfWeek;

  @IsNotEmpty({ message: `Data must be provided: shift` })
  @IsEnum(WorkShift, { message: `Invalid data type: shift` })
  shift: WorkShift;

  @IsNotEmpty({ message: `Data must be provided: type` })
  @IsEnum(SchedulingType, { message: `Invalid data type: type` })
  type: SchedulingType;

  @ValidateIf((obj) => obj.type === SchedulingType.RECYCLER)
  @IsNotEmpty({ message: `Data must be provided: city` })
  @IsString({ message: `Invalid data type: city` })
  city: string;

  @ValidateIf((obj) => obj.type === SchedulingType.RECYCLER)
  @IsNotEmpty({ message: `Data must be provided: neighborhood` })
  @IsString({ message: `Invalid data type: neighborhood` })
  neighborhood: string;

  @ValidateIf((obj) => obj.type === SchedulingType.USER)
  @IsOptional()
  @IsNotEmpty({ message: `Data must be provided: note` })
  @IsString({ message: `Invalid data type: note` })
  note?: string;
}
