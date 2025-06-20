-- CreateTable
CREATE TABLE "URLMappings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ogURL" TEXT NOT NULL,
    "mappedTail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "URLMappings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "URLMappings_ogURL_idx" ON "URLMappings"("ogURL");

-- CreateIndex
CREATE INDEX "URLMappings_mappedTail_idx" ON "URLMappings"("mappedTail");

-- CreateIndex
CREATE UNIQUE INDEX "URLMappings_ogURL_mappedTail_key" ON "URLMappings"("ogURL", "mappedTail");

-- AddForeignKey
ALTER TABLE "URLMappings" ADD CONSTRAINT "URLMappings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
