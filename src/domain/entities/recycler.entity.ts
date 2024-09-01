import { BeforeSoftRemove, Column } from 'typeorm';
import { Entity, OneToMany } from 'typeorm';
import { RecyclerScheduling } from './recycler-scheduling.entity';
import { Person } from './person.entity';
import { CreateRecyclerDto } from '../../application/dtos/create-recycler.dto';
import { Status } from '../enums/status.enum';

@Entity('recyclers')
export class Recycler extends Person {
  @Column({ unique: true })
  nationalIdentifier: string;

  @Column()
  company: string;

  @OneToMany(
    () => RecyclerScheduling,
    (recyclerScheduling) => recyclerScheduling.recycler,
    { nullable: true, eager: true },
  )
  schedulings?: RecyclerScheduling[];

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  constructor(createRecyclerDto?: CreateRecyclerDto) {
    super(createRecyclerDto?.name);
    if (createRecyclerDto) {
      this.company = createRecyclerDto.company.toUpperCase();
      this.nationalIdentifier = createRecyclerDto.nationalIdentifier;
    }
  }

  @BeforeSoftRemove()
  updateStatusBeforeSoftDelete() {
    this.status = Status.INACTIVE;
  }
}
