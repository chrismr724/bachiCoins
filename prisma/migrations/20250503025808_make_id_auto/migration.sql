-- AlterTable
CREATE SEQUENCE profesor_id_seq;
ALTER TABLE "Profesor" ALTER COLUMN "id" SET DEFAULT nextval('profesor_id_seq');
ALTER SEQUENCE profesor_id_seq OWNED BY "Profesor"."id";
