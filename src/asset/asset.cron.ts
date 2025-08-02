import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AssetService } from './asset.service';

@Injectable()
export class AssetCron {
  constructor(private assetService: AssetService) {}

  @Cron(process.env.CRON_EXPRESSION || '*/5 * * * *')
  async handleCron() {
    console.log('Running asset sync cronjob...');
    await this.assetService.syncAssets();
  }
}