import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeviceTable1754107000000 implements MigrationInterface {
    name = 'AddDeviceTable1754107000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`device_id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`locationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`device\` ADD CONSTRAINT \`FK_device_location\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`device\` DROP FOREIGN KEY \`FK_device_location\``);
        await queryRunner.query(`DROP TABLE \`device\``);
    }
} 