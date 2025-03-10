// RecommendationList.tsx - Server Component
import CompanyListEntry from "components/CompanyListEntry"
import { headers } from "next/headers"
import { auth } from "auth"

const RecommendationList = async ({ hideRated }: { hideRated: boolean }) => {
    // Get the host from headers to build the absolute URL
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
        const topRecs = await fetch(`${protocol}://${host}/api/recommendation`, {
            cache: 'no-store'
        }).then((res) => res.json()) as {
            success: boolean
            data: number[]
        }

        if (!topRecs.success) {
            throw new Error('Failed to fetch recommendations')
        }

        return (
            <div className="flex flex-col">
                {topRecs.data.length > 0 ? (
                    topRecs.data.map((id: number) => (
                        <CompanyListEntry key={id} id={id} hideRatedCompanies={hideRated} />
                    ))
                ) : (
                    <div className="p-4 text-center">
                        <p>No recommended companies found.</p>
                    </div>
                )}
            </div>
        )
    } catch (error) {
        console.error("Error fetching recommendations:", error)
        return (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
                Error: Failed to load recommendations
            </div>
        )
    }
}

export default RecommendationList