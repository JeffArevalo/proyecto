-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "cuenta" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);
