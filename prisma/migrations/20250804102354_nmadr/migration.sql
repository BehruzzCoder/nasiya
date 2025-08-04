-- CreateEnum
CREATE TYPE "PaymentSchedulesStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- AlterTable
ALTER TABLE "PaymentSchedules" ADD COLUMN     "status" "PaymentSchedulesStatus" NOT NULL DEFAULT 'PENDING';
