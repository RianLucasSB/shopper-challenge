-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "Measure" (
    "uuid" TEXT NOT NULL,
    "customerCode" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "MeasureType" NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("uuid")
);
