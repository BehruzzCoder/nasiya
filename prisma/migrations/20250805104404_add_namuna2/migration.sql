/*
  Warnings:

  - Added the required column `sellerId` to the `Namuna` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Namuna" ADD COLUMN     "sellerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Namuna" ADD CONSTRAINT "Namuna_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
