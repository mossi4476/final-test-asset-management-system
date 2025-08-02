import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AssetModule } from './asset/asset.module';
import { Asset } from './asset/entities/asset.entity';
import { Location } from './asset/entities/location.entity';
import { Device } from './asset/entities/device.entity';
import { Organization } from './asset/entities/organization.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Asset, Location, Device, Organization],
        synchronize: false, // không bật sync, dùng migration hoặc tạo bảng tay
      }),
    }),
    AssetModule,
  ],
})
export class AppModule {}
