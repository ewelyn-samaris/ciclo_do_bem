import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { WorkShift } from '../enums/work-shift.enum';

export abstract class Scheduling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DayOfWeek })
  day: DayOfWeek;

  @Column({ type: 'enum', enum: WorkShift })
  shift: WorkShift;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(day?: DayOfWeek, shift?: WorkShift) {
    if (day) this.day = day;
    if (shift) this.shift = shift;
  }
}
