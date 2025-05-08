-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_ProfesorId_fkey" FOREIGN KEY ("ProfesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
