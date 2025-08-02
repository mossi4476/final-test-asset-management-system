import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeviceTable1754109354273 implements MigrationInterface {
    name = 'AddDeviceTable1754109354273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`device\` DROP FOREIGN KEY \`FK_device_location\``);
        await queryRunner.query(`ALTER TABLE \`device\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`device\` ADD CONSTRAINT \`FK_0a37328dfe6ab8551e94fe585ea\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`device\` DROP FOREIGN KEY \`FK_0a37328dfe6ab8551e94fe585ea\``);
        await queryRunner.query(`ALTER TABLE \`device\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`device\` ADD CONSTRAINT \`FK_device_location\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
