import { NextRequest, NextResponse } from "next/server"
import { auth } from "auth"
import prisma from "lib/prisma"
import { Ratings } from "types/types"

export async function GET(request: NextFetchRequestConfig,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const session = await auth()

    if (!session?.user) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    try {
        const score = await prisma.harmonicScore.findFirst({
            where: { companyId: parseInt(id as string, 10) }
        })


        if (score) {
            //Add scores if they are not null in the response
            const scoreBody = {
                ...(score.overallScore !== null && {
                    overall: {
                        metric: "overall",
                        score: Math.floor(score.overallScore * 100),
                        provisional: false,
                    }
                }),
                ...(score.teamScore !== null && {
                    team: {
                        metric: "team",
                        score: Math.floor(score.teamScore * 100),
                        provisional: false,
                    }
                }),
                ...(score.growthScore !== null && {
                    growth: {
                        metric: "growth",
                        score: Math.floor(score.growthScore * 100),
                        provisional: false,
                    }
                }),
                ...(score.investorScore !== null && {
                    investors: {
                        metric: "investor",
                        score: Math.floor(score.investorScore * 100),
                        provisional: false,
                    }
                }),
                ...(score.fitScore !== null && {
                    mandateFit: {
                        metric: "mandate fit",
                        score: Math.floor(score.fitScore * 100),
                        provisional: false,
                    }
                }),
            }
            return NextResponse.json({
                success: true,
                data: {
                    companyId: id,
                    companyScores: scoreBody,
                },
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "No scores found.",
                data: undefined,
            })
        }
    } catch (error) {
        console.error("Error fetching scores:", error)
        return NextResponse.json({
            success: false,
            message: "Failed to fetch scores.",
            data: undefined,
        })
    }
}
