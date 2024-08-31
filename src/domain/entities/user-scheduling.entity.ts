import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Scheduling } from './scheduling.entity';
import { User } from './user.entity';
import { CreateSchedulingDto } from '../../application/dtos/create-scheduling.dto';
import { NeighborhoodRoute } from './neighborhood-route.entity';

@Entity('users-scheduling')
export class UserScheduling extends Scheduling {
  @OneToOne(() => User, (user) => user.scheduling)
  user: User;

  @Column({ nullable: true })
  note?: string;

  @Column({ default: false })
  served: boolean;

  @ManyToOne(
    () => NeighborhoodRoute,
    (neighborhoodRoute) => neighborhoodRoute.usersSchedulings,
  )
  @JoinColumn()
  neighborhoodRoute: NeighborhoodRoute;

  constructor(createUserSchedulingDto?: CreateSchedulingDto, user?: User) {
    super(createUserSchedulingDto?.day, createUserSchedulingDto?.shift);
    if (createUserSchedulingDto?.note)
      this.note = createUserSchedulingDto.note.toUpperCase() ?? null;
    if (user) this.user = user;
  }
}
