
import { Suspense } from "react"
import CompanyList from "components/CompanyList"
import LoadingSpinner from "components/LoadingSpinner"
import HideRatedToggle from "components/HideRatedToggle"

export const dynamic = 'force-dynamic'

const CompanyListPage = async ({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ hideRated?: string, page?: string, resultsPerPage?: string }> 
}) => {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const hideRated = resolvedSearchParams.hideRated === "true"
  const page = resolvedSearchParams.page || "1"
  const resultsPerPage = resolvedSearchParams.resultsPerPage || "25"
  const listId = resolvedParams.id

  if (!listId) {
    return <div>List ID is required</div>
  }

  return (
    <div className="container p-6">
      <div className="flex items-center mb-4">
        <HideRatedToggle initialValue={hideRated} />
      </div>
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      }>
        <CompanyList hideRatedCompanies={hideRated} listId={listId} page={parseInt(page)} resultsPerPage={parseInt(resultsPerPage)} />
      </Suspense>
    </div>
  )
}

export default CompanyListPage