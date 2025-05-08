-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'New class';

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
