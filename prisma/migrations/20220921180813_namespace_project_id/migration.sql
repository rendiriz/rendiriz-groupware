/*
  Warnings:

  - You are about to drop the column `projectId` on the `GitlabNamespace` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "GitlabNamespace_projectId_key";

-- AlterTable
ALTER TABLE "GitlabNamespace" DROP COLUMN "projectId";
