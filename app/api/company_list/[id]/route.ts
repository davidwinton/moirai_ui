import { NextRequest, NextResponse } from "next/server"
import prisma from "lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10)  
    const resultsPerPage = parseInt(request.nextUrl.searchParams.get('resultsPerPage') || '25', 10)
    const isNumeric = /^\d+$/.test(id)
    
    // Find the company list by ID or slug
    const companyList = await prisma.companyList.findFirst({
      where: isNumeric 
        ? { id: parseInt(id, 10) } 
        : { name: id },
      include: {
        companyListEntries: {
          select: {
            companyId: true
          },
          orderBy: {
            id: 'asc'
          },
          take: resultsPerPage,
          skip: (page - 1) * resultsPerPage
        }
      },
      
    })
    
    if (!companyList) {
      return NextResponse.json({ 
        success: false, 
        message: "Company list not found" 
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: {
        id: companyList.id,
        title: companyList.name,
        description: companyList.description,
        companyIds: companyList.companyListEntries.map((item: { companyId: number }) => item.companyId)
      }
    })
  } catch (error) {
    console.error("Error fetching company list:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch company list"
    }, { status: 500 })
  }
}