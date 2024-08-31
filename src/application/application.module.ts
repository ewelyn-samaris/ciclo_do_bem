import { Module } from '@nestjs/common';
import { RecyclerSchedulingController } from './controllers/recycler-scheduling.controller';
import { UserSchedullingController } from './controllers/user-scheduling.controller';
import { UserController } from './controllers/user.controller';
import { RecyclerController } from './controllers/recyclers.controller';
import { DomainModule } from '../domain/domain.module';
import { NeighborhoodRouteController } from './controllers/neighborhood-route.controller';
import { CreateUserValidationPipe } from './validators/create-user-validation.pipe';
import { CreateRecyclerValidationPipe } from './validators/create-recycler-validation.pipe';

@Module({
  imports: [DomainModule],
  controllers: [
    RecyclerSchedulingController,
    UserSchedullingController,
    UserController,
    RecyclerController,
    NeighborhoodRouteController,
  ],
  providers: [CreateUserValidationPipe, CreateRecyclerValidationPipe],
  exports: [CreateUserValidationPipe, CreateRecyclerValidationPipe],
})
export class ApplicationModule {}
