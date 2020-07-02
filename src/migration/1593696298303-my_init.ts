import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1593696298303 implements MigrationInterface {
    name = 'myInit1593696298303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rental" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startingDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endingDate" TIMESTAMP WITH TIME ZONE NOT NULL, "itemId" character varying, CONSTRAINT "PK_a20fc571eb61d5a30d8c16d51e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" character varying NOT NULL, "productId" character varying(300) NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_41efeb59dcde62f90ad69be0b3f" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_41efeb59dcde62f90ad69be0b3f"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "rental"`);
    }

}
