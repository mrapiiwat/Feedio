/*
  Warnings:

  - The `Status` column on the `Feeder` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Feeder" DROP COLUMN "Status",
ADD COLUMN     "Status" BOOLEAN NOT NULL DEFAULT true;
