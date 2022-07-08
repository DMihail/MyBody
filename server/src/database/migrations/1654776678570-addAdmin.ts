import {MigrationInterface, QueryRunner} from "typeorm";

export class addAdmin1654776678570 implements MigrationInterface {
    name = 'addAdmin1654776678570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admins" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "nick_name" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_980e1dcc1d927b2b2668be834f" ON "admins" ("nick_name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_980e1dcc1d927b2b2668be834f"`);
        await queryRunner.query(`DROP TABLE "admins"`);
    }

}
