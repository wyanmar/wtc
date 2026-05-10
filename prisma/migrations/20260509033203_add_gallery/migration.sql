/*
  Warnings:

  - The primary key for the `Gallery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `Gallery` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Gallery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `Gallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_branchId_fkey";

-- AlterTable
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_pkey",
DROP COLUMN "image",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "branchId" DROP NOT NULL,
ADD CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Gallery_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_slug_key" ON "Gallery"("slug");

-- CreateIndex
CREATE INDEX "Gallery_branchId_idx" ON "Gallery"("branchId");

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
