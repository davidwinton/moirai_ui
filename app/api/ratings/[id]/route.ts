import { NextRequest, NextResponse } from "next/server"
import { auth } from "auth"
import prisma from "lib/prisma"
import { Ratings } from "types/types"

export async function GET(request: NextFetchRequestConfig, { params }: { params: { id: string } }) {
  const { id } = await params

  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const ratings = await prisma.companyRating.findMany({
      where: { companyId: parseInt(id as string, 10) },
      orderBy: { createdAt: "desc" }, // Get the latest scores first
    })

    if (ratings.length > 0 && ratings[0]) {
      const latestRating = ratings[0]
      return NextResponse.json({
        success: true,
        data: {
          quality: latestRating.quality,
          fit: latestRating.fit,
          team: latestRating.team,
          investors: latestRating.investor,
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "No ratings found.",
        data: undefined,
      })
    }
  } catch (error) {
    console.error("Error fetching ratings:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch ratings.",
      data: undefined,
    })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const session = await auth() // ✅ Get session (user info)

  if (!session?.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  const body: Ratings = (await request.json()) as Ratings
  const username = session.user.email as string

  // Validate the input
  if (typeof body.quality !== "number" || typeof body.fit !== "number") {
    return NextResponse.json(
      { success: false, message: "Invalid ratings format. Quality and Fit are required as numbers." },
      { status: 400 }
    )
  }

  if (
    body.quality > 5 ||
    body.quality < 0 ||
    body.fit > 5 ||
    body.fit < 0 ||
    (body.team && (body.team > 5 || body.team < 0)) ||
    (body.investors && (body.investors > 5 || body.investors < 0))
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid ratings format. Quality and Fit are required as numbers. Everything must be between 0 and 5",
      },
      { status: 400 }
    )
  }

  try {
    prisma.companyRating.create({
      data: {
        companyId: parseInt(id as string, 10),
        quality: body.quality,
        fit: body.fit,
        team: body.team ? body.team : null,
        investor: body.investors ? body.investors : null,
        reviewer: username,
      },
    })
  } catch (error) {
    console.error("Error saving ratings:", error)
  }

  return NextResponse.json(body)
}
