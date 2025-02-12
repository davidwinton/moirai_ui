import React from "react"

type Investor = {
  name: string
  logoUrl?: string | undefined
  websiteUrl?: string | undefined
  description?: string | undefined
  rank?: number | undefined
  relevance?: number | undefined
}

interface InvestorsListProps {
  investors: Investor[]
}

const InvestorsList: React.FC<InvestorsListProps> = ({ investors }) => {
  // Determine the color based on rank
  const getColorClass = (rank: number | undefined): string => {
    if (!rank) return "text-neutral-500"
    if (rank === 1) return "text-yellow-500" // Top rank (e.g., Gold)
    if (rank <= 2) return "text-sky-500" // High rank (e.g., Silver)
    if (rank <= 3) return "text-green-500" // Mid rank
    return "text-neutral-500" // Low rank
  }

  return (
    <div className="flex w-full items-center gap-1">
      {investors.map((investor, index) => (
        <span key={investor.name} className={`${getColorClass(investor.rank)} block`}>
          {investor.name}
          {index < investors.length - 1 && ","}
        </span>
      ))}
    </div>
  )
}

export default InvestorsList
