import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { Location } from './entities/location.entity';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AssetDto } from './dto/asset.dto';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Asset) private assetRepo: Repository<Asset>,
    @InjectRepository(Location) private locationRepo: Repository<Location>,
    private dataSource: DataSource,
  ) {}

  async syncAssets() {
    const apiUrl = this.configService.get<string>('ASSET_API_URL') || 'https://669ce22d15704bb0e304842d.mockapi.io/assets';
    this.logger.log(`Bắt đầu đồng bộ assets từ API: ${apiUrl}`);

    try {
      const response = await firstValueFrom(this.httpService.get<AssetDto[]>(apiUrl));
      const data = response.data;

      this.logger.log(`Nhận được ${data.length} assets từ API`);

      const now = new Date();
      const filteredAssets = data.filter(
        (item) =>
          item.status === 'active' &&
          new Date(item.createdAt) < now
      );

      this.logger.log(`Có ${filteredAssets.length} assets cần đồng bộ`);

      if (filteredAssets.length === 0) {
        this.logger.log('Không có asset nào cần đồng bộ.');
        return;
      }

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      let syncedCount = 0;
      let skippedCount = 0;

      try {
        for (const asset of filteredAssets) {
          const location = await this.locationRepo.findOne({
            where: { location_id: asset.location_id },
          });

          if (!location) {
            this.logger.warn(`Bỏ qua asset ${asset.id} vì location_id ${asset.location_id} không tồn tại.`);
            skippedCount++;
            continue;
          }

          const exists = await this.assetRepo.findOne({ where: { asset_id: asset.id } });
          if (exists) {
            this.logger.debug(`Asset ${asset.id} đã tồn tại, bỏ qua.`);
            skippedCount++;
            continue;
          }

          const newAsset = this.assetRepo.create({
            asset_id: asset.id,
            name: asset.name,
            status: asset.status,
            location: location as any,
            createdAt: new Date(asset.createdAt),
          });

          await queryRunner.manager.save(newAsset);
          syncedCount++;
          this.logger.log(`Đã đồng bộ asset: ${asset.name} (${asset.id}) tại ${location.location_name}`);
        }

        await queryRunner.commitTransaction();
        this.logger.log(`Đồng bộ thành công! Đã đồng bộ ${syncedCount} assets, bỏ qua ${skippedCount} assets.`);
      } catch (err) {
        await queryRunner.rollbackTransaction();
        this.logger.error('Lỗi khi đồng bộ, rollback...', err);
      } finally {
        await queryRunner.release();
      }
    } catch (err) {
      this.logger.error('Lỗi khi gọi API hoặc xử lý dữ liệu:', err);
    }
  }
}