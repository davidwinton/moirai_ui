import { NextRequest, NextResponse } from "next/server"
import { auth } from "auth"
import prisma from "lib/prisma"

export async function GET(request: NextFetchRequestConfig) {
  const session = await auth()
  console.log(session)

//   if (!session?.user) {
//     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//   }

  try {
    const recommendations = await prisma.harmonicScore.findMany({
      where: { overallScore: { not: null } },
      orderBy: { overallScore: "desc" }, // Get the latest scores first
      take: 100,
      select: {
        companyId: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: recommendations.map((recommendation) => recommendation.companyId),
    })
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch recommendations.",
      data: undefined,
    })
  }
}