/*
  Warnings:

  - You are about to drop the column `fecha` on the `Balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "fecha",
ADD COLUMN     "fechas" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
