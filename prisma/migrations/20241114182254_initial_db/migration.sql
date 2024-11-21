-- CreateTable
CREATE TABLE "company_links" (
    "website_url" TEXT,
    "company_domain" TEXT,
    "logo_url" TEXT,
    "crunchbase_url" TEXT,
    "linkedin_url" TEXT,
    "pitchbook_url" TEXT,
    "affinity_url" TEXT,
    "companyId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "company_category" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "category_type" INTEGER NOT NULL,

    CONSTRAINT "company_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_categories" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "company_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "crunchbase_id" TEXT,
    "website_url" TEXT,
    "logo_url" TEXT,
    "description" TEXT,
    "founded_on" TIMESTAMP(3),
    "country_code" TEXT,
    "last_round_date" TEXT,
    "last_round" TEXT,
    "last_round_amount" DOUBLE PRECISION,
    "total_raised" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_score" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "metric_id" INTEGER,
    "score" DOUBLE PRECISION,
    "evaluation_date" TIMESTAMP(3) NOT NULL,
    "as_of_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "latest_company_score" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "metric" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "evaluation_date" TIMESTAMP(3) NOT NULL,
    "as_of_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "latest_company_score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding_round" (
    "id" SERIAL NOT NULL,
    "round" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "date" TEXT,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "funding_round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investment" (
    "id" SERIAL NOT NULL,
    "investor_id" INTEGER NOT NULL,
    "is_lead" BOOLEAN NOT NULL,
    "company_id" INTEGER NOT NULL,
    "round_id" INTEGER NOT NULL,

    CONSTRAINT "investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "crunchbase_id" TEXT,
    "logo_url" TEXT,
    "website_url" TEXT,
    "description" TEXT,
    "rank" INTEGER,
    "relevance" INTEGER,

    CONSTRAINT "investor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_links_companyId_key" ON "company_links"("companyId");

-- CreateIndex
CREATE INDEX "company_links_companyId_idx" ON "company_links"("companyId");

-- CreateIndex
CREATE INDEX "company_category_id_idx" ON "company_category"("id");

-- CreateIndex
CREATE INDEX "company_categories_company_id_idx" ON "company_categories"("company_id");

-- CreateIndex
CREATE INDEX "company_categories_category_id_idx" ON "company_categories"("category_id");

-- CreateIndex
CREATE INDEX "company_info_id_idx" ON "company_info"("id");

-- CreateIndex
CREATE INDEX "company_score_company_id_idx" ON "company_score"("company_id");

-- CreateIndex
CREATE INDEX "latest_company_score_company_id_idx" ON "latest_company_score"("company_id");

-- CreateIndex
CREATE INDEX "funding_round_company_id_idx" ON "funding_round"("company_id");

-- CreateIndex
CREATE INDEX "funding_round_id_idx" ON "funding_round"("id");

-- CreateIndex
CREATE INDEX "investment_company_id_idx" ON "investment"("company_id");

-- CreateIndex
CREATE INDEX "investment_investor_id_idx" ON "investment"("investor_id");

-- CreateIndex
CREATE INDEX "investor_id_idx" ON "investor"("id");

-- AddForeignKey
ALTER TABLE "company_links" ADD CONSTRAINT "company_links_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_categories" ADD CONSTRAINT "company_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "company_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_categories" ADD CONSTRAINT "company_categories_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_score" ADD CONSTRAINT "company_score_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_round" ADD CONSTRAINT "funding_round_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investment" ADD CONSTRAINT "investment_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investment" ADD CONSTRAINT "investment_round_id_fkey" FOREIGN KEY ("round_id") REFERENCES "funding_round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
