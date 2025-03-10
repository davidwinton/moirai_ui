-- CreateTable
CREATE TABLE "harmonic_score" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "overall_score" DOUBLE PRECISION NOT NULL,
    "growth_score" DOUBLE PRECISION NOT NULL,
    "investor_score" DOUBLE PRECISION NOT NULL,
    "team_score" DOUBLE PRECISION NOT NULL,
    "fit_score" DOUBLE PRECISION NOT NULL,
    "quality_score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "harmonic_score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harmonic_companies" (
    "name" TEXT,
    "harmonic_id" INTEGER NOT NULL,
    "website" TEXT,
    "logo_url" TEXT,
    "crunchbase_url" TEXT,
    "pitchbook_url" TEXT,
    "linkedin_url" TEXT,
    "twitter_url" TEXT,
    "affinity_url" TEXT,
    "categories" TEXT[],
    "customer_type" TEXT,
    "description" TEXT,
    "founding_date" TIMESTAMP(3),
    "last_round_date" TIMESTAMP(3),
    "total_raise" DOUBLE PRECISION,
    "stage" TEXT,
    "growth_score" DOUBLE PRECISION,
    "team_score" DOUBLE PRECISION,
    "investor_score" DOUBLE PRECISION,
    "overall_score" DOUBLE PRECISION,

    CONSTRAINT "harmonic_companies_pkey" PRIMARY KEY ("harmonic_id")
);
