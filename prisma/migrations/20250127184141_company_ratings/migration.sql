-- CreateTable
CREATE TABLE "company_rating" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "fit" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "team" INTEGER,
    "investor" INTEGER,
    "reviewer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_rating_pkey" PRIMARY KEY ("id")
);
