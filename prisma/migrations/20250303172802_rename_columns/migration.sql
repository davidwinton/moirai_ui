-- AlterTable
ALTER TABLE "harmonic_score" ALTER COLUMN "overall_score" DROP NOT NULL,
ALTER COLUMN "growth_score" DROP NOT NULL,
ALTER COLUMN "investor_score" DROP NOT NULL,
ALTER COLUMN "team_score" DROP NOT NULL,
ALTER COLUMN "fit_score" DROP NOT NULL,
ALTER COLUMN "quality_score" DROP NOT NULL;
