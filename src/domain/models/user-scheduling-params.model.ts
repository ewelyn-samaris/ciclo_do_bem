import { DayOfWeek } from '../enums/day-of-week.enum';
import { WorkShift } from '../enums/work-shift.enum';

export class UserSchedulingParams {
  day: DayOfWeek;
  shift: WorkShift;
  city: string;
  neighborhood: string;
}
