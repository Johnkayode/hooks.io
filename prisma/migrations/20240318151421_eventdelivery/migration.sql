/*
  Warnings:

  - You are about to drop the column `forwardedAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EventDeliveryStatus" AS ENUM ('PROCESSING', 'SUCCESSFUL', 'FAILED');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "forwardedAt",
DROP COLUMN "status";

-- DropEnum
DROP TYPE "EventStatus";

-- CreateTable
CREATE TABLE "EventDelivery" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "endpointId" TEXT NOT NULL,
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "status" "EventDeliveryStatus" NOT NULL DEFAULT 'PROCESSING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDelivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventDelivery" ADD CONSTRAINT "EventDelivery_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDelivery" ADD CONSTRAINT "EventDelivery_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
