import { CreateSchedulingDto } from '../../application/dtos/create-scheduling.dto';
import { Scheduling } from '../entities/scheduling.entity';
import { SchedulingType } from '../enums/scheduling-type.enum';
import { UserScheduling } from '../entities/user-scheduling.entity';
import { User } from '../entities/user.entity';
import { RecyclerScheduling } from '../entities/recycler-scheduling.entity';
import { Person } from '../entities/person.entity';
import { Recycler } from '../entities/recycler.entity';

export abstract class SchedulingFactory {
  static create(
    createSchedulingDto: CreateSchedulingDto,
    person: Person,
  ): Scheduling {
    const schedulings = {
      [SchedulingType.USER]: () =>
        new UserScheduling(createSchedulingDto, person as User),
      [SchedulingType.RECYCLER]: () =>
        new RecyclerScheduling(createSchedulingDto, person as Recycler),
    };

    return schedulings[createSchedulingDto.type]();
  }
}
