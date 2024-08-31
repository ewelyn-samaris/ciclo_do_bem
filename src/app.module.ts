import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './domain/entities/address.entity';
import { User } from './domain/entities/user.entity';
import { Recycler } from './domain/entities/recycler.entity';
import { RecyclerScheduling } from './domain/entities/recycler-scheduling.entity';
import { UserScheduling } from './domain/entities/user-scheduling.entity';
import { NeighborhoodRoute } from './domain/entities/neighborhood-route.entity';
import { ScheduleModule } from '@nestjs/schedule';
import 'dotenv/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Address,
        User,
        Recycler,
        RecyclerScheduling,
        UserScheduling,
        NeighborhoodRoute,
      ],
      synchronize: true,
      logging: true,
    }),
    ApplicationModule,
  ],
})
export class AppModule {}
