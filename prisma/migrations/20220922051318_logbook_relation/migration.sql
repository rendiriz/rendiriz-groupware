/*
  Warnings:

  - A unique constraint covering the columns `[commitId]` on the table `Logbook` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Logbook_commitId_key" ON "Logbook"("commitId");
