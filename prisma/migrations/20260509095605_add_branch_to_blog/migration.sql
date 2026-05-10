-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "branchId" INTEGER;

-- CreateIndex
CREATE INDEX "Blog_branchId_idx" ON "Blog"("branchId");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
