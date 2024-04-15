/*
  Warnings:

  - A unique constraint covering the columns `[sourceId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscription_sourceId_key" ON "Subscription"("sourceId");
