import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AssetService } from './asset.service';
import { AssetCron } from './asset.cron';
import { Asset } from './entities/asset.entity';
import { Location } from './entities/location.entity';
import { Device } from './entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset, Location, Device]),
    HttpModule,
  ],
  providers: [AssetService, AssetCron],
  exports: [AssetService],
})
export class AssetModule {}