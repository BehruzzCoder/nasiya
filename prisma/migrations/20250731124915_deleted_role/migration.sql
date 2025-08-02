/*
  Warnings:

  - You are about to drop the column `role` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `login` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "role",
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pinCode" INTEGER;

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "role";
