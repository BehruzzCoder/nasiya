-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "debtSum" INTEGER NOT NULL,
    "PinCode" INTEGER NOT NULL,
    "DeferredPayments" TEXT NOT NULL,
    "debterCount" INTEGER NOT NULL,
    "wallet" INTEGER NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "debtSum" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "sellerId" INTEGER NOT NULL,

    CONSTRAINT "Debter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debt" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "term" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "debterId" INTEGER NOT NULL,

    CONSTRAINT "Debt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImgOfDebter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "debterId" INTEGER NOT NULL,

    CONSTRAINT "ImgOfDebter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImgOfDebt" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "debtId" INTEGER NOT NULL,

    CONSTRAINT "ImgOfDebt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhoneOfDebter" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "debterId" INTEGER NOT NULL,

    CONSTRAINT "PhoneOfDebter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "isSended" BOOLEAN NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "debterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "debtorId" INTEGER NOT NULL,
    "sum" INTEGER NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "sellerId" INTEGER NOT NULL,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Debter" ADD CONSTRAINT "Debter_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "Debter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImgOfDebter" ADD CONSTRAINT "ImgOfDebter_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "Debter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImgOfDebt" ADD CONSTRAINT "ImgOfDebt_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "Debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhoneOfDebter" ADD CONSTRAINT "PhoneOfDebter_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "Debter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "Debter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
