import { DataSource } from 'typeorm';
import { Asset } from '../asset/entities/asset.entity';
import { Location } from '../asset/entities/location.entity';
import { Device } from '../asset/entities/device.entity';
import { Organization } from '../asset/entities/organization.entity';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASS || '',
  database: process.env.DATABASE_NAME || 'asset_management',
  entities: [Asset, Location, Device, Organization],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
