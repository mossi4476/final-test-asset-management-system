import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AssetService } from './asset.service';

@Injectable()
export class AssetCron {
  constructor(private assetService: AssetService) {}

  @Cron(process.env.CRON_EXPRESSION || '0 0 * * *')
  async handleCron() {
    await this.assetService.syncAssets();
  }
}