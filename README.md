# Asset Sync Service

Microservice để đồng bộ tài sản từ BR Company API vào hệ thống quản lý tài sản.

## 🎯 Mục tiêu

- Đồng bộ tự động assets từ API `https://669ce22d15704bb0e304842d.mockapi.io/assets`
- Quản lý dữ liệu Organization, Location, Device, Asset
- Chạy cronjob định kỳ để cập nhật dữ liệu
- Cung cấp API endpoints để quản lý thủ công

## 🏗️ Kiến trúc

### Entities
```
Organization (1) → (N) Location
Location (1) → (N) Device
Location (1) → (N) Asset
```

### Technology Stack
- **Framework**: NestJS
- **Database**: MySQL với TypeORM
- **HTTP Client**: Axios
- **Scheduling**: @nestjs/schedule
- **Configuration**: @nestjs/config

## 🚀 Quick Start

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình environment
Tạo file `.env`:
```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASS=
DATABASE_NAME=asset_management

# API Configuration
ASSET_API_URL=https://669ce22d15704bb0e304842d.mockapi.io/assets

# Cron (optional)
CRON_EXPRESSION=*/5 * * * *
```

### 3. Setup database
```bash
# Build project
npm run build

# Run migrations
npx typeorm migration:run -d migration-runner.js

# Seed data
npm run seed
```

### 4. Khởi động service
```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/assets/health` | Health check |
| POST | `/assets/sync` | Manual asset sync |

### Examples
```bash
# Health check
curl http://localhost:3000/assets/health

# Manual sync
curl -X POST http://localhost:3000/assets/sync
```

## ⏰ Cronjob

Service tự động đồng bộ assets mỗi 5 phút:
- **Schedule**: `*/5 * * * *`
- **Configurable**: Thông qua `CRON_EXPRESSION`
- **Logging**: Chi tiết quá trình đồng bộ

## 🗄️ Database

### Migrations
- `1754106761912-CreateTables.ts` - Tạo bảng Asset, Location
- `1754107000000-AddDeviceTable.ts` - Thêm bảng Device
- `1754107100000-AddOrganizationTable.ts` - Thêm bảng Organization

### Seed Data
- **2 Organizations**: PNS, PLJ
- **5 Locations**: Da Nang, Ha Noi, Ho Chi Minh, Nha Trang, Can Tho
- **15 Devices**: Laptops, Desktops, Printers, Monitors, Network equipment

## 🔄 Sync Process

1. **API Call**: Gọi BR Company API
2. **Filter**: Lọc assets active và createdAt < now
3. **Validate**: Kiểm tra location_id tồn tại
4. **Check Duplicate**: Tránh trùng lặp
5. **Insert**: Lưu vào database với transaction
6. **Log**: Ghi log chi tiết

## 📋 Logging

```
[AssetService] Bắt đầu đồng bộ assets từ API: https://...
[AssetService] Nhận được 10 assets từ API
[AssetService] Có 8 assets cần đồng bộ
[AssetService] Đã đồng bộ asset: Laptop Dell (LAP001) tại Da Nang
[AssetService] Đồng bộ thành công! Đã đồng bộ 8 assets, bỏ qua 2 assets.
```

## 🛠️ Development

### Scripts
```bash
npm run build          # Build project
npm run start:dev      # Development server
npm run start:prod     # Production server
npm run test           # Run tests
npm run test:e2e       # E2E tests
npm run seed           # Seed data
npm run lint           # Lint code
npm run format         # Format code
```

### Project Structure
```
src/
├── asset/
│   ├── entities/          # Database entities
│   ├── dto/              # Data transfer objects
│   ├── seeds/            # Seed data
│   ├── asset.service.ts  # Business logic
│   ├── asset.controller.ts # API endpoints
│   ├── asset.cron.ts     # Scheduled tasks
│   └── asset.module.ts   # Module configuration
├── config/
│   └── database.config.ts # Database config
├── migrations/           # Database migrations
├── app.module.ts         # Root module
└── main.ts              # Application entry
```

## 🔧 Configuration

### Environment Variables
| Variable | Default | Description |
|----------|---------|-------------|
| DATABASE_HOST | localhost | MySQL host |
| DATABASE_PORT | 3306 | MySQL port |
| DATABASE_USER | root | MySQL username |
| DATABASE_PASS | | MySQL password |
| DATABASE_NAME | asset_management | Database name |
| ASSET_API_URL | https://669ce22d15704bb0e304842d.mockapi.io/assets | BR Company API |
| CRON_EXPRESSION | */5 * * * * | Cron schedule |

## 🐛 Troubleshooting

### Lỗi kết nối database
```bash
# Kiểm tra MySQL service
sudo service mysql status

# Kiểm tra connection
mysql -u root -p -h localhost
```

### Lỗi migration
```bash
# Build trước khi migrate
npm run build

# Chạy migration
npx typeorm migration:run -d migration-runner.js
```

### Lỗi cronjob
```bash
# Test thủ công
curl -X POST http://localhost:3000/assets/sync

# Kiểm tra log
tail -f logs/application.log
```

## 📈 Monitoring

### Health Check
```bash
curl http://localhost:3000/assets/health
# Response: {"status": "Asset service is running"}
```

### Manual Sync
```bash
curl -X POST http://localhost:3000/assets/sync
# Response: {"message": "Asset sync completed"}
```

## 🔒 Security

- Sử dụng environment variables cho sensitive data
- Database connection với credentials
- API endpoints với proper validation
- Transaction management cho data integrity

## 📄 License

UNLICENSED - Private project
