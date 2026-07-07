/*
  Warnings:

  - You are about to drop the column `ReviewCount` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ReviewCount",
ADD COLUMN     "reviewCount" INTEGER;
