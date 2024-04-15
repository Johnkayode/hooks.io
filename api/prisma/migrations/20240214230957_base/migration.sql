/*
  Warnings:

  - You are about to drop the column `url` on the `Source` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Source_url_key";

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "url";
