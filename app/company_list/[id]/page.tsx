
import { Suspense } from "react"
import CompanyList from "components/CompanyList"
import LoadingSpinner from "components/LoadingSpinner"
import HideRatedToggle from "components/HideRatedToggle"
import { notFound, useParams } from "next/navigation"

export const dynamic = 'force-dynamic'

const CompanyListPage = async ({ 
  params,
  searchParams 
}: { 
  params: { id: string },
  searchParams: { hideRated?: string, page?: string, resultsPerPage?: string } 
}) => {
  
  const hideRated = searchParams.hideRated === "true"
  const page = searchParams.page || "1"
  const resultsPerPage = searchParams.resultsPerPage || "25"
  const listId = params.id

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