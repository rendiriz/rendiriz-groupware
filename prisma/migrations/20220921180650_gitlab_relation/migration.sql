/*
  Warnings:

  - You are about to drop the column `webhookId` on the `GitlabProject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[namespaceId]` on the table `GitlabProject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `GitlabWebhook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `namespaceId` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `GitlabWebhook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GitlabNamespace" DROP CONSTRAINT "GitlabNamespace_projectId_fkey";

-- DropForeignKey
ALTER TABLE "GitlabProject" DROP CONSTRAINT "GitlabProject_webhookId_fkey";

-- DropIndex
DROP INDEX "GitlabProject_webhookId_key";

-- AlterTable
ALTER TABLE "GitlabProject" DROP COLUMN "webhookId",
ADD COLUMN     "namespaceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GitlabWebhook" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GitlabProject_namespaceId_key" ON "GitlabProject"("namespaceId");

-- CreateIndex
CREATE UNIQUE INDEX "GitlabWebhook_projectId_key" ON "GitlabWebhook"("projectId");

-- AddForeignKey
ALTER TABLE "GitlabWebhook" ADD CONSTRAINT "GitlabWebhook_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "GitlabProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitlabProject" ADD CONSTRAINT "GitlabProject_namespaceId_fkey" FOREIGN KEY ("namespaceId") REFERENCES "GitlabNamespace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
