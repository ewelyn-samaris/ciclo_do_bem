import { BeforeSoftRemove, Column, Entity } from 'typeorm';
import { JoinColumn, OneToOne } from 'typeorm';
import { UserScheduling } from './user-scheduling.entity';
import { Person } from './person.entity';
import { Address } from './address.entity';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { Status } from '../enums/status.enum';

@Entity('users')
export class User extends Person {
  @Column({ unique: true })
  email: string;

  @OneToOne(() => UserScheduling, (userScheduling) => userScheduling.user, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  scheduling?: UserScheduling;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  constructor(createUserDto?: CreateUserDto, address?: Address) {
    super(createUserDto?.name);
    if (createUserDto) this.email = createUserDto.email;
    if (address) this.address = address;
  }

  @BeforeSoftRemove()
  updateStatusBeforeSoftDelete() {
    this.status = Status.INACTIVE;
  }
}
