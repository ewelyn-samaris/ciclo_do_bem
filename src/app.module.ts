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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [
          Address,
          User,
          Recycler,
          RecyclerScheduling,
          UserScheduling,
          NeighborhoodRoute,
        ],
        synchronize: false,
        logging: true,
      }),
    }),
    ApplicationModule,
  ],
})
export class AppModule {}
