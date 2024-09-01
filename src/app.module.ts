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
        host: configService.get<string>('PGHOST'),
        port: configService.get<number>('PGPORT'),
        username: configService.get<string>('PGUSER'),
        password: configService.get<string>('PGPASSWORD'),
        database: configService.get<string>('PGDATABASE'),
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
      })
    }),
    ApplicationModule,
  ],
})
export class AppModule {}
