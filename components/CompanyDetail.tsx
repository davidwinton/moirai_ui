"use client"

import * as SubframeCore from "@subframe/core"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Badge } from "@/subframe/components/Badge"
import { VerticalStepper } from "@/subframe/components/VerticalStepper"
import RatingsButton from "components/RatingsButton"
import { formatDate, formatNumber, formatPercentage, getInvestorRank, toTitleCase } from "lib/utils"
import { HarmonicResponse } from "types/harmonicResponse"
import { CompanyScore, DefiDetails, Ratings } from "types/types"

const getBadge = (label: string, score: number | undefined) => {
  if (!score) {
    return <Badge key={"badge-" + label}>{label}</Badge>
  }

  const variant = score > 90 ? "success" : score > 80 ? "neutral" : "warning"

  return <Badge variant={variant}>{`${label}: ${score}`}</Badge>
}

const getRatingBadge = (label: string, score: number | undefined) => {
  if (!score) {
    return <Badge key={"badge-" + label}>{label}</Badge>
  }

  const variant = score > 3 ? "success" : score > 2 ? "neutral" : "error"

  return <Badge variant={variant}>{`${label}: ${score}`}</Badge>
}

const score_list = [
  56556915, 53938838, 18656035, 43276461, 10195420, 55016033, 47467530, 56362167, 23491747, 7584821, 21776594, 4211342,
  10909956, 47596274, 11148643, 4160964, 53068584, 55883677, 44597548, 54813562, 57544641, 37066783, 45206273, 42851860,
  4116225, 12760858, 56739311, 57028703, 53927583, 41922392, 3081893, 56244584, 12587815, 31723608, 19390514, 38808915,
  55218902, 3863172, 56731501, 55560540,
]
const traction_list = [
  0.9454024693, 0.8573133252, 0.7084775039, 0.7084775039, 0.979286458, 1.15380862, 1.060109732, 1.104697599,
  1.035610465, 0.8244031162, 1.238208423, 1.008505991, 0.9426683097, 0.9119177845, 0.4692167619, 0.625742862,
  1.325233381, 1.314586459, 1.308909138, 1.288478579, 1.269369842, 1.268895106, 1.259100924, 1.258843782, 1.256140359,
  1.254112058, 1.246253549, 1.245541662, 1.243347265, 1.240723887, 1.239263786, 1.232110137, 1.231831264, 1.2294076,
  1.229000718, 1.223804307, 1.221828471, 1.217149372, 1.216206262, 1.214659937,
]

const calculateCompanyScore = (company: HarmonicResponse) => {
  if (!company) {
    return null
  }
  const scoreIndex = score_list.indexOf(company.id)
  const teamScore = Math.min(80 + (company?.employee_highlights?.length || 0), 100)
  const tractionScore = scoreIndex !== -1 ? 50 + (50 * (traction_list[scoreIndex] || 0)) / 1.325233381 : 0
  const allInvestors = company.funding_rounds?.map((fundingRound) => fundingRound.investors).flat()
  const leads = allInvestors
    ?.filter((investor) => investor.is_lead)
    ?.map((investor) => getInvestorRank(investor.investor_name))
    ?.map((tier) => (tier === 0 ? 0 : 5 - tier))
  const followers = allInvestors
    ?.filter((investor) => !investor.is_lead)
    ?.map((investor) => getInvestorRank(investor.investor_name))
    ?.map((tier) => (tier === 0 ? 0 : 5 - tier))
  const highestLead = leads?.length ? Math.max(...leads) : 0
  const highestFollower = followers?.length ? Math.max(...followers) : highestLead

  const averageLead = leads?.length ? leads.reduce((a: number, b: number) => a + b, 0) / leads.length : highestLead
  const averageFollower = followers?.length
    ? followers.reduce((a: number, b: number) => a + b, 0) / followers.length
    : highestFollower

  const isBlockchain =
    company.tags_v2.filter(
      (tag) => tag.type?.toLowerCase().includes("technology") && tag.display_value?.toLowerCase().includes("blockchain")
    ).length > 0
  const isFinServ =
    company.tags_v2.filter(
      (tag) => tag.type?.toLowerCase().includes("market") && tag.display_value?.toLowerCase().includes("financial")
    ).length > 0

  const scores: CompanyScore = {
    overall: {
      metric: "overall",
      score: Math.floor(scoreIndex !== -1 ? 93 - scoreIndex / 2 : 0),
    },
    team: {
      metric: "team",
      score: Math.floor(teamScore),
    },

    growth: {
      metric: "growth",
      score: Math.floor(tractionScore),
    },
    investors: {
      metric: "investor",
      score: Math.floor((highestLead + averageLead) * 10 + (highestFollower + averageFollower) * 2.5),
    },
    mandateFit: {
      metric: "mandate fit",
      score: (isBlockchain ? 70 : 0) + (isFinServ ? 30 : 0),
    },
  }
  return scores
}

const getPercentageSpan = (amount: number | null | undefined) => {
  if (!amount) {
    return <span className="font-body text-body text-neutral-400">N/A</span>
  }
  if (amount > 0) {
    return <span className="font-body text-body text-success-700">{formatPercentage(amount)}</span>
  }

  return <span className="font-body text-body text-error-700">{formatPercentage(amount)}</span>
}

type DetailsParams = {
  id: number
}

const CompanyDetails: React.FC<DetailsParams> = ({ id }) => {
  const [company, setCompany] = useState<HarmonicResponse | null>(null)
  const [defiDetails, setDefiDetails] = useState<DefiDetails | null>(null)
  const [companyScores, setCompanyScores] = useState<CompanyScore | null>(null)
  const [ratings, setRatings] = useState<Ratings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (id) {
      const fetchCompany = async () => {
        try {
          setIsLoading(true)
          const response = await fetch(`/api/harmonic_company/${id}`)

          if (!response.ok) {
            console.log(response)
            throw new Error("Failed to fetch company")
          }

          const data = (await response.json()) as HarmonicResponse
          setCompany(data)
          setCompanyScores(calculateCompanyScore(data))
          fetchRatings()
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message)
          } else {
            setError("Something went wrong")
          }
        } finally {
          setIsLoading(false)
        }
      }
      const fetchRatings = async () => {
        try {
          const response = await fetch(`/api/ratings/${id}`)

          if (!response.ok) {
            console.log(response)
            setRatings(null)
            return
          }
          const result: unknown = await response.json()
          if (typeof result !== "object" || result === null) {
            console.warn("Invalid ratings response: unknown")
            setRatings(null)
            return
          }

          const ratingsResponse = result as { success: boolean; data?: Ratings; message?: string }
          if (!ratingsResponse.success || !ratingsResponse.data) {
            console.warn("Invalid ratings response:", ratingsResponse.message || "No data field")
            setRatings(null)
            return
          }

          setRatings(ratingsResponse.data)
        } catch (err) {
          if (err instanceof Error) {
            console.error(err.message)
          } else {
            console.error("Something went wrong with DefiLlama integration")
          }
        }
      }

      fetchCompany()
    }
  }, [id])

  const updateRatings = async (ratings: Ratings) => {
    try {
      const response = await fetch(`/api/ratings/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratings),
      })

      if (!response.ok) {
        console.log(response)
        setRatings(null)
      }

      const data = (await response.json()) as Ratings
      setRatings(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Something went wrong with DefiLlama integration")
      }
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  if (!company) {
    return null
  }
  const scoreIndex = score_list.indexOf(Number(id))
  const overallScore = scoreIndex !== -1 ? 93 - scoreIndex / 2 : ""

  return (
    <Link href={`/company/${id}`} className="p-2">
      <div className="flex size-full flex-col items-start overflow-auto">
        <div className="flex w-full min-w-[320px] flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background p-6 shadow-sm mobile:w-full mobile:shrink-0 mobile:grow mobile:basis-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <a href={company?.website?.url} target="_blank" rel="noreferrer">
                <img className="max-h-[40px] flex-none" src={company?.logo_url} />
              </a>
              <span className="font-heading-2 text-heading-2 text-default-font">{company.name}</span>
            </div>
            <RatingsButton onSubmit={updateRatings} />
            <div className="flex items-center gap-2">
              {ratings?.quality ? getRatingBadge("Q", ratings?.quality) : null}
              {ratings?.fit ? getRatingBadge("F", ratings?.fit) : null}
              {ratings?.investors ? getRatingBadge("I", ratings?.investors) : null}
              {ratings?.team ? getRatingBadge("T", ratings?.team) : null}
              {!!overallScore && <Badge variant="success">{"" + overallScore}</Badge>}
              {company.id ? (
                <a
                  href={"https://console.harmonic.ai/dashboard/company/" + company.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="max-h-[40px] flex-none" src="/images/crunchbase.png" />
                </a>
              ) : (
                <img className="max-h-[40px] flex-none" src="/images/crunchbase_gray.png" />
              )}
              {company?.socials["PITCHBOOK"] ? (
                <a href={company?.socials["PITCHBOOK"].url} target="_blank" rel="noreferrer">
                  <img className="max-h-[40px] flex-none" src="/images/pitchbook.png" />
                </a>
              ) : (
                <img className="max-h-[40px] flex-none" src="/images/pitchbook_gray.png" />
              )}
              {company?.socials["LINKEDIN"] ? (
                <a href={company?.socials["LINKEDIN"].url} target="_blank" rel="noreferrer">
                  <img className="max-h-[40px] flex-none" src="/images/linkedin.png" />
                </a>
              ) : (
                <img className="max-h-[40px] flex-none" src="/images/linkedin_gray.png" />
              )}
              {company?.socials["TWITTER"] ? (
                <a href={company?.socials["TWITTER"].url} target="_blank" rel="noreferrer">
                  <img className="max-h-[40px] flex-none" src="/images/twitter.png" />
                </a>
              ) : (
                <img className="max-h-[40px] flex-none" src="/images/twitter_gray.png" />
              )}

              <img className="max-h-[40px] flex-none" src="/images/affinity_gray.png" />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-start gap-2 p-1">
              {company?.tags_v2?.map((category) => (
                <Badge key={category.display_value}>{category.display_value}</Badge>
              ))}
              {company?.customer_type && (
                <Badge key={company?.customer_type} variant="neutral">
                  {company?.customer_type}
                </Badge>
              )}
            </div>
            <VerticalStepper />
            <div className="float-right flex items-start gap-2 p-1">
              {getBadge("Overall", companyScores?.overall?.score)}
              {getBadge("Team", companyScores?.team?.score)}
              {getBadge("Investors", companyScores?.investors?.score)}
              {getBadge("Growth", companyScores?.growth?.score)}
              {getBadge("Fit", companyScores?.mandateFit?.score)}
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
          <span className="font-body text-body text-default-font">{company.description}</span>
          <div className="flex w-full items-start gap-2 p-1">
            <div className="flex shrink-0 grow basis-0 flex-col items-end gap-2 p-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon className="font-body text-body text-default-font" name="FeatherBookOpen" />
                <span className="font-body text-body text-default-font">Founded</span>
              </div>
              <span className="font-body text-body text-default-font">
                {formatDate(company.founding_date.date, false) ?? company.founding_date.date}
              </span>
            </div>
            <div className="flex shrink-0 grow basis-0 flex-col items-end gap-2 p-1">
              <span className="font-body text-body text-default-font">Stage</span>
              <span className="font-body text-body text-default-font">{toTitleCase(company.stage)}</span>
            </div>
            <div className="flex shrink-0 grow basis-0 flex-col items-end gap-2 p-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon className="font-body text-body text-default-font" name="FeatherBanknote" />
                <span className="font-body text-body text-default-font">Raised</span>
              </div>
              <span className="font-body text-body text-default-font">
                ${formatNumber(company?.funding?.funding_total)}
              </span>
            </div>
            <div className="flex shrink-0 grow basis-0 flex-col items-end gap-2 p-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon className="font-body text-body text-default-font" name="FeatherBanknote" />
                <span className="font-body text-body text-default-font">TVL</span>
              </div>
              <span className="font-body text-body text-default-font">${formatNumber(defiDetails?.tvl)}</span>
            </div>
            <div className="flex shrink-0 grow basis-0 flex-col items-end gap-2 p-1">
              <span className="font-body text-body text-default-font">Headcount</span>
              <span className="font-body text-body text-default-font">{company.headcount}</span>
            </div>
            <div className="flex shrink-0 grow basis-0 flex-col items-end gap-2 p-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon className="font-body text-body text-default-font" name="FeatherTriangle" />
                <span className="font-body text-body text-default-font">Headcount</span>
              </div>
              {getPercentageSpan(company.traction_metrics?.headcount?.["90d_ago"]?.percent_change)}
            </div>
            <div className="flex shrink-0 grow basis-0 flex-col items-end gap-2 p-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon className="font-body text-body text-default-font" name="FeatherActivity" />
                <span className="font-body text-body text-default-font">MAU</span>
              </div>
              <span className="font-body text-body text-default-font">
                {formatNumber(
                  (company?.traction_metrics?.web_traffic["30d_ago"]?.value || 0) +
                    (company?.traction_metrics?.web_traffic["30d_ago"]?.change || 0)
                )}
              </span>
            </div>
            <div className="flex shrink-0 grow basis-0 flex-col items-end gap-2 p-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon className="font-body text-body text-default-font" name="FeatherTriangle" />
                <span className="font-body text-body text-default-font">MAU</span>
              </div>
              {getPercentageSpan(company?.traction_metrics?.web_traffic["30d_ago"]?.percent_change)}
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
        </div>
      </div>
    </Link>
  )
}

export default CompanyDetails
