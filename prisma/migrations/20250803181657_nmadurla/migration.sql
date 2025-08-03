/*
  Warnings:

  - You are about to drop the column `PinCode` on the `Seller` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Debt" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "PinCode";

-- CreateIndex
CREATE UNIQUE INDEX "Admin_login_key" ON "Admin"("login");
