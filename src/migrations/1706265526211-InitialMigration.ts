import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1706265526211 implements MigrationInterface {
    name = 'InitialMigration1706265526211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "isbn" character varying NOT NULL, "genre" character varying NOT NULL, "publicationYear" integer NOT NULL, "price" integer NOT NULL, "quantityInStock" integer NOT NULL, CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE ("isbn"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
