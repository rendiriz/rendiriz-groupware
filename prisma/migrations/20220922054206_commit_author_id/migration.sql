/*
  Warnings:

  - Changed the type of `author_id` on the `GitlabCommit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GitlabCommit" DROP COLUMN "author_id",
ADD COLUMN     "author_id" INTEGER NOT NULL;
