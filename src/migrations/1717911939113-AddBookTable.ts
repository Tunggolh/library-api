import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookTable1717911939113 implements MigrationInterface {
    name = 'AddBookTable1717911939113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "isbn" character varying NOT NULL, "published_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_categories_category" ("bookId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_baff6a8cd85658522dd9568a6ba" PRIMARY KEY ("bookId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3f2c919594cd1b6386240d6d46" ON "book_categories_category" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_83b564c6e2518a2af3c60ac9da" ON "book_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "book_authors_author" ("bookId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_963de00068693ab6e5767de614b" PRIMARY KEY ("bookId", "authorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bf58ffb2a12a8609a738ee8ca" ON "book_authors_author" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a4cafdf2ec9974524a5321c751" ON "book_authors_author" ("authorId") `);
        await queryRunner.query(`ALTER TABLE "book_categories_category" ADD CONSTRAINT "FK_3f2c919594cd1b6386240d6d464" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_categories_category" ADD CONSTRAINT "FK_83b564c6e2518a2af3c60ac9da6" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_authors_author" ADD CONSTRAINT "FK_9bf58ffb2a12a8609a738ee8cae" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_authors_author" ADD CONSTRAINT "FK_a4cafdf2ec9974524a5321c7516" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_authors_author" DROP CONSTRAINT "FK_a4cafdf2ec9974524a5321c7516"`);
        await queryRunner.query(`ALTER TABLE "book_authors_author" DROP CONSTRAINT "FK_9bf58ffb2a12a8609a738ee8cae"`);
        await queryRunner.query(`ALTER TABLE "book_categories_category" DROP CONSTRAINT "FK_83b564c6e2518a2af3c60ac9da6"`);
        await queryRunner.query(`ALTER TABLE "book_categories_category" DROP CONSTRAINT "FK_3f2c919594cd1b6386240d6d464"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4cafdf2ec9974524a5321c751"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bf58ffb2a12a8609a738ee8ca"`);
        await queryRunner.query(`DROP TABLE "book_authors_author"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83b564c6e2518a2af3c60ac9da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f2c919594cd1b6386240d6d46"`);
        await queryRunner.query(`DROP TABLE "book_categories_category"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
