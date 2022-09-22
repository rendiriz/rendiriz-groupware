/*
  Warnings:

  - You are about to drop the column `file` on the `GitlabCommitAdded` table. All the data in the column will be lost.
  - You are about to drop the column `file` on the `GitlabCommitModified` table. All the data in the column will be lost.
  - You are about to drop the column `file` on the `GitlabCommitRemoved` table. All the data in the column will be lost.
  - Added the required column `filename` to the `GitlabCommitAdded` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `GitlabCommitModified` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `GitlabCommitRemoved` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GitlabCommitAdded" DROP COLUMN "file",
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GitlabCommitModified" DROP COLUMN "file",
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GitlabCommitRemoved" DROP COLUMN "file",
ADD COLUMN     "filename" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Logbook" (
    "id" TEXT NOT NULL,
    "commitId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "nameTask" TEXT NOT NULL,
    "tupoksiJabatanId" TEXT NOT NULL,
    "dateTask" TIMESTAMP(3) NOT NULL,
    "dateSend" TIMESTAMP(3),
    "difficultyTask" INTEGER NOT NULL,
    "evidenceTask" TEXT,
    "documentTask" TEXT NOT NULL,
    "workPlace" TEXT NOT NULL DEFAULT 'WFH',
    "organizerTask" TEXT NOT NULL DEFAULT 'JDS',
    "isMainTask" BOOLEAN,
    "isDocumentLink" BOOLEAN NOT NULL DEFAULT true,
    "isStatus" TEXT NOT NULL,

    CONSTRAINT "Logbook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logbook" ADD CONSTRAINT "Logbook_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "GitlabCommit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
