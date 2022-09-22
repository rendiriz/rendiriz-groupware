/*
  Warnings:

  - Added the required column `webhookId` to the `GitlabCommit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GitlabCommit" ADD COLUMN     "webhookId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GitlabCommit" ADD CONSTRAINT "GitlabCommit_webhookId_fkey" FOREIGN KEY ("webhookId") REFERENCES "GitlabWebhook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
