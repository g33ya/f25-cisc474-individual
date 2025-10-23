/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerId]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Authentication_provider_providerId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_provider_providerId_key" ON "Authentication"("provider", "providerId");
