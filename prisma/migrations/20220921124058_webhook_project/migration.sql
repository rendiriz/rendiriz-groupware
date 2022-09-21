-- CreateTable
CREATE TABLE "GitlabWebhook" (
    "id" TEXT NOT NULL,
    "object_kind" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "before" TEXT NOT NULL,
    "after" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "checkout_sha" TEXT NOT NULL,
    "message" TEXT,
    "user_provider" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_username" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_avatar" TEXT NOT NULL,
    "total_commits_count" INTEGER NOT NULL,

    CONSTRAINT "GitlabWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitlabProject" (
    "id" INTEGER NOT NULL,
    "webhookId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "web_url" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "git_ssh_url" TEXT NOT NULL,
    "git_http_url" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "visibility_level" TEXT NOT NULL,
    "path_with_namespace" TEXT NOT NULL,
    "default_branch" TEXT NOT NULL,
    "ci_config_path" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "http_url" TEXT NOT NULL,

    CONSTRAINT "GitlabProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitlabCommit" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_email" TEXT NOT NULL,

    CONSTRAINT "GitlabCommit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitlabCommitAdded" (
    "id" TEXT NOT NULL,
    "commitId" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "GitlabCommitAdded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitlabCommitModified" (
    "id" TEXT NOT NULL,
    "commitId" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "GitlabCommitModified_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitlabCommitRemoved" (
    "id" TEXT NOT NULL,
    "commitId" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "GitlabCommitRemoved_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GitlabProject_webhookId_key" ON "GitlabProject"("webhookId");

-- AddForeignKey
ALTER TABLE "GitlabWebhook" ADD CONSTRAINT "GitlabWebhook_user_provider_user_id_fkey" FOREIGN KEY ("user_provider", "user_id") REFERENCES "Account"("provider", "providerAccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitlabProject" ADD CONSTRAINT "GitlabProject_webhookId_fkey" FOREIGN KEY ("webhookId") REFERENCES "GitlabWebhook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitlabCommitAdded" ADD CONSTRAINT "GitlabCommitAdded_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "GitlabCommit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitlabCommitModified" ADD CONSTRAINT "GitlabCommitModified_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "GitlabCommit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitlabCommitRemoved" ADD CONSTRAINT "GitlabCommitRemoved_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "GitlabCommit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
