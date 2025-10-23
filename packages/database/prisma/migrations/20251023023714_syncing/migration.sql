-- DropIndex
DROP INDEX "public"."Authentication_provider_providerId_key";

-- CreateIndex
CREATE INDEX "Authentication_provider_providerId_idx" ON "Authentication"("provider", "providerId");
