/*
  Warnings:

  - Added the required column `description` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE group_id_seq;
ALTER TABLE "Group" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('group_id_seq'),
ALTER COLUMN "students" SET DEFAULT 0;
ALTER SEQUENCE group_id_seq OWNED BY "Group"."id";
