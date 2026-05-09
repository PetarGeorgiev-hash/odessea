import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1778359046945 implements MigrationInterface {
    name = 'InitialSchema1778359046945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sights_category_enum" AS ENUM('history', 'nature', 'sea', 'culture', 'food', 'religious', 'park')`);
        await queryRunner.query(`CREATE TABLE "sights" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "nameLocal" character varying, "description" text NOT NULL, "shortDescription" character varying NOT NULL, "category" "public"."sights_category_enum" NOT NULL, "tags" text NOT NULL, "latitude" numeric(10,7) NOT NULL, "longitude" numeric(10,7) NOT NULL, "address" character varying NOT NULL, "openingHours" character varying, "entryFee" character varying, "website" character varying, "busLines" text, "walkingMinutes" integer NOT NULL DEFAULT '0', "drivingMinutes" integer NOT NULL DEFAULT '0', "isVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, CONSTRAINT "PK_cc13da55c9ded4132783f6755b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "publicId" character varying, "caption" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "reviewId" uuid, "uploadedById" uuid, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, "sightId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "status" "public"."events_status_enum" NOT NULL DEFAULT 'upcoming', "latitude" numeric(10,7), "longitude" numeric(10,7), "locationName" character varying, "startsAt" TIMESTAMP NOT NULL, "endsAt" TIMESTAMP, "maxAttendees" integer NOT NULL DEFAULT '0', "coverImage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" uuid, "sightId" uuid, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."guides_difficulty_enum" AS ENUM('easy', 'moderate', 'hard')`);
        await queryRunner.query(`CREATE TABLE "guides" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "coverImage" character varying, "durationMinutes" integer NOT NULL DEFAULT '0', "difficulty" "public"."guides_difficulty_enum" NOT NULL DEFAULT 'easy', "tags" text, "isPublished" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, CONSTRAINT "PK_8de34e682c2201d625cf95c1266" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "name" character varying NOT NULL, "avatar" character varying, "bio" character varying, "provider" character varying NOT NULL DEFAULT 'local', "providerId" character varying, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_attendees" ("eventId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_edb4129eb44589ffaccce13f6ce" PRIMARY KEY ("eventId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21056813ffb169d392d38a40c2" ON "event_attendees" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_07eb323a7b08ba51fe4b582f3f" ON "event_attendees" ("userId") `);
        await queryRunner.query(`CREATE TABLE "guide_sights" ("guideId" uuid NOT NULL, "sightId" uuid NOT NULL, CONSTRAINT "PK_6076d7a09d38f959dd71aec0458" PRIMARY KEY ("guideId", "sightId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b45d431af700a2ef073f069ad1" ON "guide_sights" ("guideId") `);
        await queryRunner.query(`CREATE INDEX "IDX_92395398adf930188ef2bf7502" ON "guide_sights" ("sightId") `);
        await queryRunner.query(`ALTER TABLE "sights" ADD CONSTRAINT "FK_efd880cedea788517a2fcfdfb95" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_3be799f99b056d4b2fa7584c31a" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_555e65a79c560d678712a3aec1e" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_48770372f891b9998360e4434f3" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_e15affccf4144d8c1815d090a2b" FOREIGN KEY ("sightId") REFERENCES "sights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_d50a61ffc0248eeba7a66e34c39" FOREIGN KEY ("sightId") REFERENCES "sights"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guides" ADD CONSTRAINT "FK_93faf6b5b73185de0d4a27b6465" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_attendees" ADD CONSTRAINT "FK_21056813ffb169d392d38a40c2d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_attendees" ADD CONSTRAINT "FK_07eb323a7b08ba51fe4b582f3f4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "guide_sights" ADD CONSTRAINT "FK_b45d431af700a2ef073f069ad19" FOREIGN KEY ("guideId") REFERENCES "guides"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "guide_sights" ADD CONSTRAINT "FK_92395398adf930188ef2bf75021" FOREIGN KEY ("sightId") REFERENCES "sights"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guide_sights" DROP CONSTRAINT "FK_92395398adf930188ef2bf75021"`);
        await queryRunner.query(`ALTER TABLE "guide_sights" DROP CONSTRAINT "FK_b45d431af700a2ef073f069ad19"`);
        await queryRunner.query(`ALTER TABLE "event_attendees" DROP CONSTRAINT "FK_07eb323a7b08ba51fe4b582f3f4"`);
        await queryRunner.query(`ALTER TABLE "event_attendees" DROP CONSTRAINT "FK_21056813ffb169d392d38a40c2d"`);
        await queryRunner.query(`ALTER TABLE "guides" DROP CONSTRAINT "FK_93faf6b5b73185de0d4a27b6465"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_d50a61ffc0248eeba7a66e34c39"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_c621508a2b84ae21d3f971cdb47"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_e15affccf4144d8c1815d090a2b"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_48770372f891b9998360e4434f3"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_555e65a79c560d678712a3aec1e"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_3be799f99b056d4b2fa7584c31a"`);
        await queryRunner.query(`ALTER TABLE "sights" DROP CONSTRAINT "FK_efd880cedea788517a2fcfdfb95"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92395398adf930188ef2bf7502"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b45d431af700a2ef073f069ad1"`);
        await queryRunner.query(`DROP TABLE "guide_sights"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07eb323a7b08ba51fe4b582f3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21056813ffb169d392d38a40c2"`);
        await queryRunner.query(`DROP TABLE "event_attendees"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "guides"`);
        await queryRunner.query(`DROP TYPE "public"."guides_difficulty_enum"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP TABLE "sights"`);
        await queryRunner.query(`DROP TYPE "public"."sights_category_enum"`);
    }

}
