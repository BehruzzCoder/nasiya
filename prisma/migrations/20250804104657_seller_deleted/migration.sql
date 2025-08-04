/*
  Warnings:

  - You are about to drop the column `DeferredPayments` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `debtSum` on the `Seller` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "DeferredPayments",
DROP COLUMN "debtSum";
