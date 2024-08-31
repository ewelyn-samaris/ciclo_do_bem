import { UserScheduling } from '../entities/user-scheduling.entity';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { WorkShift } from '../enums/work-shift.enum';

export class CreateNeighborhoodRoute {
  day: DayOfWeek;
  shift: WorkShift;
  city: string;
  neighborhood: string;
  usersSchedulings: UserScheduling[];
}
