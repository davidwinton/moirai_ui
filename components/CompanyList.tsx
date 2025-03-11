// CompanyList.tsx - Server Component
import CompanyListEntry from "components/CompanyListEntry"
import { headers } from "next/headers"
import { auth } from "auth"

type CompanyListParams = {
    hideRatedCompanies?: boolean
    listId: string
    page: number
    resultsPerPage: number
}

type CompanyListResponse = {
    success: boolean
    data: {
        id: number
        title: string
        description: string
        companyIds: number[]
    }
}

const CompanyList = async ({ listId, page, resultsPerPage, hideRatedCompanies }: CompanyListParams) => {
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const session = await auth()
   
    if (!session?.user) {
        return (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
                Error: Authentication required
            </div>
        )
    }

    try {
        const url = `${protocol}://${host}/api/company_list/${listId}?page=${page}&resultsPerPage=${resultsPerPage}`
        const companyList = await fetch(
            url,
            { cache: 'no-store' }
        ).then((res) => res.json()) as CompanyListResponse

        if (!companyList.success) {
            throw new Error('Failed to fetch list')
        }

        return (  
            <div className="flex flex-col">
                {companyList.data.companyIds.length > 0 ? (
                    companyList.data.companyIds.map((id: number) => (
                        <CompanyListEntry key={id} id={id} hideRatedCompanies={hideRatedCompanies} />
                    ))
                ) : (
                    <div className="p-4 text-center">
                        <p>No companies found.</p>
                    </div>
                )}
            </div>
        )
    } catch (error) {
        console.error("Error fetching recommendations:", error)
        return (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
                Error: Failed to load list
            </div>
        )
    }
}

export default CompanyList