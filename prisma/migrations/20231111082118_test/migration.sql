-- CreateEnum
CREATE TYPE "Color" AS ENUM ('red', 'blue', 'green');

-- CreateTable
CREATE TABLE "Test" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "colors" "Color"[] DEFAULT ARRAY[]::"Color"[],

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
