import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1754106761912 implements MigrationInterface {
    name = 'CreateTables1754106761912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`asset\` (\`id\` int NOT NULL AUTO_INCREMENT, \`asset_id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`locationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`location_id\` int NOT NULL, \`location_name\` varchar(255) NOT NULL, \`organization\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_b6e6c23b493859e5875de66c18\` (\`location_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`asset\` ADD CONSTRAINT \`FK_44168e58419a8874f31ccd0b294\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asset\` DROP FOREIGN KEY \`FK_44168e58419a8874f31ccd0b294\``);
        await queryRunner.query(`DROP INDEX \`IDX_b6e6c23b493859e5875de66c18\` ON \`location\``);
        await queryRunner.query(`DROP TABLE \`location\``);
        await queryRunner.query(`DROP TABLE \`asset\``);
    }

}
