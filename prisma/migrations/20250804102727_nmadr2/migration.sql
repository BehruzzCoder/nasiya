/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `PaymentSchedules` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PaymentSchedules" ALTER COLUMN "date" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSchedules_date_key" ON "PaymentSchedules"("date");
