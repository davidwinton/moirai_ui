
import { Suspense } from "react"
import RecommendationList from "components/RecommendationList"
import LoadingSpinner from "components/LoadingSpinner"
import HideRatedToggle from "components/HideRatedToggle"

export const dynamic = 'force-dynamic'

const RecommendationPage = async ({ 
  searchParams 
}: { 
  searchParams: { hideRated?: string } 
}) => {
  const params = await searchParams
  const hideRated = params.hideRated === "true"

  return (
    <div className="container p-6">
      <h1 className="mb-4 text-2xl font-bold">Recommended Companies</h1>
      <div className="flex items-center mb-4">
        <HideRatedToggle initialValue={hideRated} />
      </div>
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      }>
        <RecommendationList hideRated={hideRated} />
      </Suspense>
    </div>
  )
}

export default RecommendationPage