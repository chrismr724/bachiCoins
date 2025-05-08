/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Profesor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profesor_email_key" ON "Profesor"("email");
