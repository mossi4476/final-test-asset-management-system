import { Controller, Post, Get } from '@nestjs/common';
import { AssetService } from './asset.service';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('sync')
  async syncAssets() {
    await this.assetService.syncAssets();
    return { message: 'Asset sync completed' };
  }

  @Get('health')
  async healthCheck() {
    return { status: 'Asset service is running' };
  }
} 