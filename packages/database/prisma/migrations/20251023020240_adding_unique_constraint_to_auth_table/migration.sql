/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerId]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Authentication_provider_providerId_key" ON "Authentication"("provider", "providerId");
