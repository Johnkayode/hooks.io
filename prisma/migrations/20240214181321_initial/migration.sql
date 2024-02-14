-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('RECEIVED', 'FORWARDED', 'RETRIED', 'FAILED');

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "headers" JSONB NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'RECEIVED',

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EndpointToSubscription" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_url_key" ON "Endpoint"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_EndpointToSubscription_AB_unique" ON "_EndpointToSubscription"("A", "B");

-- CreateIndex
CREATE INDEX "_EndpointToSubscription_B_index" ON "_EndpointToSubscription"("B");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EndpointToSubscription" ADD CONSTRAINT "_EndpointToSubscription_A_fkey" FOREIGN KEY ("A") REFERENCES "Endpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EndpointToSubscription" ADD CONSTRAINT "_EndpointToSubscription_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
