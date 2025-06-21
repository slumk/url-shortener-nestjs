/*
  Warnings:

  - A unique constraint covering the columns `[mappedTail]` on the table `URLMappings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "URLMappings_mappedTail_key" ON "URLMappings"("mappedTail");
