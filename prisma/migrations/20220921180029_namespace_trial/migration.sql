/*
  Warnings:

  - The `trial` column on the `GitlabNamespace` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GitlabNamespace" DROP COLUMN "trial",
ADD COLUMN     "trial" BOOLEAN;
