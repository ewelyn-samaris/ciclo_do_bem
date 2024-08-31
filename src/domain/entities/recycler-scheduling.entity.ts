import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Recycler } from './recycler.entity';
import { Scheduling } from './scheduling.entity';
import { CreateSchedulingDto } from '../../application/dtos/create-scheduling.dto';

@Entity('recyclers-scheduling')
export class RecyclerScheduling extends Scheduling {
  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @ManyToOne(() => Recycler, (recycler) => recycler.schedulings)
  @JoinColumn()
  recycler: Recycler;

  constructor(
    createRecyclerSchedulingDto?: CreateSchedulingDto,
    recycler?: Recycler,
  ) {
    super(createRecyclerSchedulingDto?.day, createRecyclerSchedulingDto?.shift);
    if (createRecyclerSchedulingDto) {
      this.city = createRecyclerSchedulingDto.city.toUpperCase();
      this.neighborhood =
        createRecyclerSchedulingDto.neighborhood.toUpperCase();
    }
    if (recycler) this.recycler = recycler;
  }
}
