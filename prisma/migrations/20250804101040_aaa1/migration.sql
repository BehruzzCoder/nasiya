/*
  Warnings:

  - You are about to drop the `Payments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `monthly_amount` to the `Debt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debt" ADD COLUMN     "monthly_amount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Payments";

-- CreateTable
CREATE TABLE "PaymentSchedules" (
    "id" SERIAL NOT NULL,
    "debt_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expected_amount" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentSchedules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentSchedules" ADD CONSTRAINT "PaymentSchedules_debt_id_fkey" FOREIGN KEY ("debt_id") REFERENCES "Debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
