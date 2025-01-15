/*
  Warnings:

  - You are about to drop the column `companyId` on the `company_links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_id]` on the table `company_links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `company_links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "company_links" DROP CONSTRAINT "company_links_companyId_fkey";

-- DropIndex
DROP INDEX "company_links_companyId_idx";

-- DropIndex
DROP INDEX "company_links_companyId_key";

-- AlterTable
ALTER TABLE "company_info" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "company_links" DROP COLUMN "companyId",
ADD COLUMN     "company_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_links_company_id_key" ON "company_links"("company_id");

-- CreateIndex
CREATE INDEX "company_links_company_id_idx" ON "company_links"("company_id");

-- AddForeignKey
ALTER TABLE "company_links" ADD CONSTRAINT "company_links_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
