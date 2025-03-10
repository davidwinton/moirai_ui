
import { Suspense } from "react"
import CompanyList from "components/CompanyList"
import LoadingSpinner from "components/LoadingSpinner"
import HideRatedToggle from "components/HideRatedToggle"

export const dynamic = 'force-dynamic'

const CompanyListPage = async ({ 
  searchParams 
}: { 
  searchParams: { hideRated?: string, page?: string, resultsPerPage?: string, listId?: string } 
}) => {
  const params = await searchParams
  const hideRated = params.hideRated === "true"
  const page = params.page || "1"
  const resultsPerPage = params.resultsPerPage || "25"
  const listId = params.listId || ""

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