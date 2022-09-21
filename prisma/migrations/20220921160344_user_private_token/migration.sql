/*
  Warnings:

  - You are about to drop the column `private_token` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "private_token";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "private_token" TEXT;
