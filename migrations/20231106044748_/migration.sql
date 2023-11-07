/*
  Warnings:

  - You are about to drop the column `fechas` on the `Balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "fechas",
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
