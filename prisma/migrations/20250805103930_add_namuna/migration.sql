-- CreateTable
CREATE TABLE "Namuna" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "text" TEXT NOT NULL,

    CONSTRAINT "Namuna_pkey" PRIMARY KEY ("id")
);
