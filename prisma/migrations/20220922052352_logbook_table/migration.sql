/*
  Warnings:

  - You are about to drop the column `dateTask` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `documentTask` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `nameTask` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `Logbook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[groupwareProjectId]` on the table `GitlabProject` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "GitlabProject" ADD COLUMN     "groupwareProjectId" TEXT NOT NULL DEFAULT 'groupwareProjectId';

-- AlterTable
ALTER TABLE "Logbook" DROP COLUMN "dateTask",
DROP COLUMN "documentTask",
DROP COLUMN "nameTask",
DROP COLUMN "projectId",
DROP COLUMN "projectName",
ALTER COLUMN "tupoksiJabatanId" SET DEFAULT '62d6421d-be8d-4390-ba5c-252108818350',
ALTER COLUMN "difficultyTask" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GitlabProject_groupwareProjectId_key" ON "GitlabProject"("groupwareProjectId");
