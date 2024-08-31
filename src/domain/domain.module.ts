import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserService } from './services/user.service';
import { RecyclerService } from './services/recycler.service';
import { AddressService } from './services/address.service';
import { RecyclerSchedulingService } from './services/recycler-scheduling.service';
import { UserSchedulingService } from './services/user-scheduling.service';
import { NeighborhoodRouteService } from './services/neighborhood-route.service';
import { RouteJobCreator } from './services/route-job-creator.service';
import { CreateRecyclerSchedulingValidationService } from './validators/create-recycler-scheduling-validation.service';
import { CreateRecyclerValidationService } from './validators/create-recycler-validation.service';
import { CreateUserSchedulingValidationService } from './validators/create-user-scheduling-validation.service';
import { CreateUserValidationService } from './validators/create-user-validation.service';

@Module({
  imports: [InfrastructureModule],
  exports: [
    RouteJobCreator,
    RouteJobCreator,
    CreateRecyclerSchedulingValidationService,
    CreateRecyclerValidationService,
    CreateUserSchedulingValidationService,
    CreateUserValidationService,
    'IUserService',
    'IRecyclerService',
    'IRecyclerSchedulingService',
    'IUserSchedulingService',
    'IAddressService',
    'INeighborhoodRouteService',
  ],
  providers: [
    RouteJobCreator,
    CreateRecyclerSchedulingValidationService,
    CreateRecyclerValidationService,
    CreateUserSchedulingValidationService,
    CreateUserValidationService,
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'IRecyclerService',
      useClass: RecyclerService,
    },
    {
      provide: 'IUserSchedulingService',
      useClass: UserSchedulingService,
    },
    {
      provide: 'IRecyclerSchedulingService',
      useClass: RecyclerSchedulingService,
    },
    {
      provide: 'IAddressService',
      useClass: AddressService,
    },
    {
      provide: 'INeighborhoodRouteService',
      useClass: NeighborhoodRouteService,
    },
  ],
})
export class DomainModule {}
