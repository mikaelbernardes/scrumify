/*
  Warnings:

  - You are about to drop the column `company` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `document` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_company_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "company",
DROP COLUMN "document";
