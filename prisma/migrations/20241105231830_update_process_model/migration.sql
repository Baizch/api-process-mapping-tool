/*
  Warnings:

  - You are about to drop the column `responsibleId` on the `Process` table. All the data in the column will be lost.
  - You are about to drop the `Tool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProcessTools` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_responsibleId_fkey";

-- DropForeignKey
ALTER TABLE "_ProcessTools" DROP CONSTRAINT "_ProcessTools_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProcessTools" DROP CONSTRAINT "_ProcessTools_B_fkey";

-- AlterTable
ALTER TABLE "Process" DROP COLUMN "responsibleId",
ADD COLUMN     "responsible" TEXT,
ADD COLUMN     "tools" TEXT[];

-- DropTable
DROP TABLE "Tool";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_ProcessTools";
