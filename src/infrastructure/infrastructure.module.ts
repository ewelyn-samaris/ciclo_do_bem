import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { RecyclerRepository } from './repositories/recycler.repository';
import { AddressRepository } from './repositories/address.repository';
import { GeoLocationService } from './geo-location.service';
import { UserSchedulingRepository } from './repositories/user-scheduling.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { UserScheduling } from '../domain/entities/user-scheduling.entity';
import { Address } from '../domain/entities/address.entity';
import { Recycler } from '../domain/entities/recycler.entity';
import { RecyclerScheduling } from '../domain/entities/recycler-scheduling.entity';
import { RecyclerSchedulingRepository } from './repositories/recycler-scheduling.repository';
import { NeighborhoodRouteRepository } from './repositories/neighborhood-route.repository';
import { NeighborhoodRoute } from '../domain/entities/neighborhood-route.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserScheduling,
      Address,
      Recycler,
      RecyclerScheduling,
      NeighborhoodRoute,
    ]),
  ],
  providers: [
    {
      provide: 'IUserSchedulingRepository',
      useClass: UserSchedulingRepository,
    },
    {
      provide: 'IRecyclerSchedulingRepository',
      useClass: RecyclerSchedulingRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IRecyclerRepository',
      useClass: RecyclerRepository,
    },
    {
      provide: 'IAddressRepository',
      useClass: AddressRepository,
    },
    {
      provide: 'IGeoLocationService',
      useClass: GeoLocationService,
    },
    {
      provide: 'INeighborhoodRouteRepository',
      useClass: NeighborhoodRouteRepository,
    },
  ],
  exports: [
    'IUserSchedulingRepository',
    'IRecyclerSchedulingRepository',
    'IUserRepository',
    'IRecyclerRepository',
    'IAddressRepository',
    'INeighborhoodRouteRepository',
    'IGeoLocationService',
  ],
})
export class InfrastructureModule {}
