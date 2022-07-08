import {MigrationInterface, QueryRunner} from "typeorm";

export class adChatTable1654785334121 implements MigrationInterface {
    name = 'adChatTable1654785334121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "message_id" integer NOT NULL, "date" integer NOT NULL, "text" varchar NOT NULL, "chatId" integer)`);
        await queryRunner.query(`CREATE TABLE "chats" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "chat_id" integer NOT NULL, "title" varchar NOT NULL, "is_bot" boolean NOT NULL, "language_code" varchar NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cb573d310bde330521e7715db2" ON "chats" ("chat_id") `);
        await queryRunner.query(`CREATE TABLE "temporary_messages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "message_id" integer NOT NULL, "date" integer NOT NULL, "text" varchar NOT NULL, "chatId" integer, CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_messages"("id", "message_id", "date", "text", "chatId") SELECT "id", "message_id", "date", "text", "chatId" FROM "messages"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`ALTER TABLE "temporary_messages" RENAME TO "messages"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" RENAME TO "temporary_messages"`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "message_id" integer NOT NULL, "date" integer NOT NULL, "text" varchar NOT NULL, "chatId" integer)`);
        await queryRunner.query(`INSERT INTO "messages"("id", "message_id", "date", "text", "chatId") SELECT "id", "message_id", "date", "text", "chatId" FROM "temporary_messages"`);
        await queryRunner.query(`DROP TABLE "temporary_messages"`);
        await queryRunner.query(`DROP INDEX "IDX_cb573d310bde330521e7715db2"`);
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
