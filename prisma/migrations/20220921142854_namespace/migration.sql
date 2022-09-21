/*
  Warnings:

  - You are about to drop the column `ci_config_path` on the `GitlabProject` table. All the data in the column will be lost.
  - You are about to drop the column `git_http_url` on the `GitlabProject` table. All the data in the column will be lost.
  - You are about to drop the column `git_ssh_url` on the `GitlabProject` table. All the data in the column will be lost.
  - You are about to drop the column `homepage` on the `GitlabProject` table. All the data in the column will be lost.
  - You are about to drop the column `http_url` on the `GitlabProject` table. All the data in the column will be lost.
  - You are about to drop the column `namespace` on the `GitlabProject` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `GitlabProject` table. All the data in the column will be lost.
  - You are about to drop the column `visibility_level` on the `GitlabProject` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forks_count` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `http_url_to_repo` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_activity_at` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_with_namespace` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readme_url` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ssh_url_to_repo` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `star_count` to the `GitlabProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GitlabProject" DROP COLUMN "ci_config_path",
DROP COLUMN "git_http_url",
DROP COLUMN "git_ssh_url",
DROP COLUMN "homepage",
DROP COLUMN "http_url",
DROP COLUMN "namespace",
DROP COLUMN "url",
DROP COLUMN "visibility_level",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "forks_count" INTEGER NOT NULL,
ADD COLUMN     "http_url_to_repo" TEXT NOT NULL,
ADD COLUMN     "last_activity_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name_with_namespace" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "readme_url" TEXT NOT NULL,
ADD COLUMN     "ssh_url_to_repo" TEXT NOT NULL,
ADD COLUMN     "star_count" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GitlabNamespace" (
    "id" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "full_path" TEXT NOT NULL,
    "parent_id" INTEGER,
    "avatar_url" TEXT,
    "web_url" TEXT NOT NULL,
    "billable_members_count" INTEGER NOT NULL,
    "seats_in_use" INTEGER,
    "max_seats_used" INTEGER,
    "plan" TEXT,
    "trial_ends_on" TEXT,
    "trial" TEXT,

    CONSTRAINT "GitlabNamespace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GitlabNamespace_projectId_key" ON "GitlabNamespace"("projectId");

-- AddForeignKey
ALTER TABLE "GitlabNamespace" ADD CONSTRAINT "GitlabNamespace_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "GitlabProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
