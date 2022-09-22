-- DropIndex
DROP INDEX "GitlabProject_groupwareProjectId_key";

-- AlterTable
ALTER TABLE "GitlabProject" ALTER COLUMN "groupwareProjectId" DROP NOT NULL;
