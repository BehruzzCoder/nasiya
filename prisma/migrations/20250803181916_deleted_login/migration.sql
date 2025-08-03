/*
  Warnings:

  - You are about to drop the column `login` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Admin_login_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "login";

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
