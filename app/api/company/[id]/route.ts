import { FundingRound, Investment, Investor } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"
import prisma from "lib/prisma" // Adjust the import path as needed

type UIInvestor = {
  name: string
  logoUrl?: string | undefined
  websiteUrl?: string | undefined
  description?: string | undefined
  rank?: number | undefined
  relevance?: number | undefined
}
const mapInvestor = (investor: Investor): UIInvestor => {
  return {
    name: investor.name,
    logoUrl: investor.logoUrl ?? undefined,
    websiteUrl: investor.websiteUrl ?? undefined,
    description: investor.description ?? undefined,
    rank: investor.rank ?? undefined,
    relevance: investor.relevance ?? undefined,
  }
}
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Convert id to number
    const companyId = parseInt(params.id)

    // Validate the ID
    if (isNaN(companyId)) {
      return NextResponse.json({ error: "Invalid company ID" }, { status: 400 })
    }

    // Transaction to fetch company and related objects
    const [companyInfo, companyLinks, companyScores, fundingRounds, categories] = await prisma.$transaction([
      prisma.companyInfo.findUnique({
        where: { id: companyId },
      }),
      prisma.companyLinks.findUnique({
        where: { companyId: companyId },
      }),
      prisma.latestCompanyScore.findMany({
        where: { companyId: companyId },
      }),
      prisma.investment.findMany({
        where: { companyId: companyId },
        include: {
          investor: true,
          fundingRound: true,
        },
      }),
      prisma.companyCategories.findMany({
        where: { companyId: companyId },
        include: {
          category: true,
        },
      }),
    ])

    if (!companyInfo) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }

    const groupedFundingRounds = fundingRounds.reduce(
      (acc: { [key: string]: (Investment & { fundingRound: FundingRound } & { investor: Investor })[] }, current) => {
        const key = `${current.fundingRound.round}_${current.fundingRound.date}`

        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(current)
        return acc
      },
      {}
    )

    const mappedFundingRounds = Object.values(groupedFundingRounds)
      .sort(
        (a, b) => new Date(b[0]?.fundingRound.date ?? "").getTime() - new Date(a[0]?.fundingRound.date ?? "").getTime()
      )
      .map((group) => {
        const round = group[0]?.fundingRound.round
        const date = group[0]?.fundingRound.date
        const amount = group[0]?.fundingRound.amount
        const leads = group
          .filter((investment) => investment.isLead)
          .map((investment) => mapInvestor(investment.investor))
        const followers = group
          .filter((investment) => !investment.isLead)
          .map((investment) => mapInvestor(investment.investor))

        return { round, amount, date, leads, followers }
      })

    const company = {
      id: companyInfo.id,
      name: companyInfo.name,
      description: companyInfo.description,
      links: {
        websiteUrl: companyLinks?.websiteUrl,
        logoUrl: companyLinks?.logoUrl,
        crunchbaseUrl: companyLinks?.crunchbaseUrl,
        linkedinUrl: companyLinks?.linkedinUrl,
        pitchbookUrl: companyLinks?.pitchbookUrl,
        affinityUrl: companyLinks?.affinityUrl,
      },
      details: {
        foundingDate: companyInfo.foundedOn,
        lastRoundDate: companyInfo.lastRoundDate,
        lastRound: companyInfo.lastRound,
        lastRoundAmount: companyInfo.lastRoundAmount,
        totalRaised: companyInfo.totalRaised,
        tvl: 2_700_000_000,
        headcount: 14,
        headcountGrowth: 0.4,
        mau: 326_200,
        mauGrowth: -0.11,
      },
      score: {
        overall: {
          metric: "Overall",
          score: companyScores.find((score) => score.metric === "overall")?.score,
          category: "Overall",
          orderId: 1,
        },
        team: {
          metric: "Team",
          score: companyScores.find((score) => score.metric === "team")?.score,
          category: "Team",
          orderId: 2,
        },
        growth: {
          metric: "Growth",
          score: companyScores.find((score) => score.metric === "growth")?.score,
          category: "Growth",
          orderId: 3,
        },
        investors: {
          metric: "Investors",
          score: companyScores.find((score) => score.metric === "investor")?.score,
          category: "Investors",
          orderId: 4,
        },
        mandateFit: {
          metric: "Mandate Fit",
          score: companyScores.find((score) => score.metric === "fit")?.score,
          category: "Mandate Fit",
          orderId: 5,
        },
      },
      categories: categories
        .filter((category) => category.category.categoryType === 1)
        .map((category) => category.category.label),
      categoryGroups: categories
        .filter((category) => category.category.categoryType === 2)
        .map((category) => category.category.label),
      fundingRounds: mappedFundingRounds,
    }

    return NextResponse.json({ company }, { status: 200 })
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
