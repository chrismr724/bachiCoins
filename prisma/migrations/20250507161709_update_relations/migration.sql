/*
  Warnings:

  - A unique constraint covering the columns `[Matricula]` on the table `Estudiante` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_Matricula_key" ON "Estudiante"("Matricula");
