-- CreateTable
CREATE TABLE "Cuenta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cuenta_pkey" PRIMARY KEY ("id")
);
