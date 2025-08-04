import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AssetService } from './asset.service';

@Injectable()
export class AssetCron {
  constructor(private assetService: AssetService) {}

  @Cron(process.env.CRON_EXPRESSION || '*/5 * * * *') // CRON_EXPRESSION=* * * * * # Test mỗi phút, khi deploy thật thì để 0 0 * * *,   (mỗi ngày 1 lần) → dùng '0 0 * * *' (0h00 mỗi ngày).
  async handleCron() {
    console.log('Running asset sync cronjob...');
    await this.assetService.syncAssets();
  }
}