import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrganizationTable1754107100000 implements MigrationInterface {
    name = 'AddOrganizationTable1754107100000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create organization table
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`organization_id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_organization_id\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        
        // Add organizationId column to location table
        await queryRunner.query(`ALTER TABLE \`location\` ADD \`organizationId\` int NULL`);
        
        // Add foreign key constraint
        await queryRunner.query(`ALTER TABLE \`location\` ADD CONSTRAINT \`FK_location_organization\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`location\` DROP FOREIGN KEY \`FK_location_organization\``);
        await queryRunner.query(`ALTER TABLE \`location\` DROP COLUMN \`organizationId\``);
        await queryRunner.query(`DROP INDEX \`IDX_organization_id\` ON \`organization\``);
        await queryRunner.query(`DROP TABLE \`organization\``);
    }
} 