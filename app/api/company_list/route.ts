import { NextRequest, NextResponse } from "next/server"
import prisma from "lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const listId = params.id
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10)  
    const resultsPerPage = parseInt(request.nextUrl.searchParams.get('resultsPerPage') || '25', 10)
    const isNumeric = /^\d+$/.test(listId)
    
    // Find the company list by ID or slug
    const companyList = await prisma.companyList.findFirst({
      where: isNumeric 
        ? { id: parseInt(listId, 10) } 
        : { name: listId },
      include: {
        companyListEntries: {
          select: {
            companyId: true
          },
          orderBy: {
            companyId: 'asc'
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