import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserScheduling } from './user-scheduling.entity';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { CreateNeighborhoodRoute } from '../models/create-neighborhood-route.model';

@Entity('neighborhood-routes')
export class NeighborhoodRoute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  day: DayOfWeek;

  @Column()
  shift: string;

  @Column()
  neighborhood: string;

  @OneToMany(
    () => UserScheduling,
    (userScheduling) => userScheduling.neighborhoodRoute,
  )
  usersSchedulings: UserScheduling[];

  constructor(createNeighborhoodRoute?: CreateNeighborhoodRoute) {
    if (createNeighborhoodRoute) {
      this.day = createNeighborhoodRoute.day;
      this.city = createNeighborhoodRoute.city.toUpperCase();
      this.shift = createNeighborhoodRoute.shift;
      this.neighborhood = createNeighborhoodRoute.neighborhood.toUpperCase();
      this.usersSchedulings = createNeighborhoodRoute.usersSchedulings;
    }
  }
}
