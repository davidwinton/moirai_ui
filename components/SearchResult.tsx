"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Badge } from "@/subframe/components/Badge"
import { VerticalStepper } from "@/subframe/components/VerticalStepper"
import { HarmonicCompanyResponse } from "types/harmonicResponse"
import { Ratings } from "types/types"

const getRatingBadge = (label: string, score: number | undefined) => {
  if (!score) {
    return <Badge key={"badge-" + label}>{label}</Badge>
  }

  const variant = score > 8 ? "success" : score > 6 ? "neutral" : "error"

  return <Badge variant={variant}>{`${label}: ${score}`}</Badge>
}

const scores = [
  56556915, 53938838, 18656035, 43276461, 10195420, 55016033, 47467530, 56362167, 23491747, 7584821, 21776594, 4211342,
  10909956, 47596274, 11148643, 4160964, 53068584, 55883677, 44597548, 54813562, 57544641, 37066783, 45206273, 42851860,
  4116225, 12760858, 56739311, 57028703, 53927583, 41922392, 3081893, 56244584, 12587815, 31723608, 19390514, 38808915,
  55218902, 3863172, 56731501, 55560540,
]

type SearchResultParam = {
  company: HarmonicCompanyResponse
}

const SearchResult: React.FC<SearchResultParam> = ({ company }) => {
  const id = company.id
  const [ratings, setRatings] = useState<Ratings | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`/api/ratings/${id}`)

        if (!response.ok) {
          console.log(response)
          setRatings(null)
        }

        const data = (await response.json()) as Ratings
        setRatings(data)
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        } else {
          console.error("Something went wrong with DefiLlama integration")
        }
      }
    }

    fetchRatings()
  }, [company])

  if (error) return <div>Error: {error}</div>

  if (!company) {
    return null
  }
  const scoreIndex = scores.indexOf(Number(id))
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
            {/* <div className="flex items-start gap-2 px-1 py-1 float-right">
                            {getBadge('Overall', companyScores?.overall?.score)}
                            {getBadge('Team', companyScores?.team?.score)}
                            {getBadge('Investors', companyScores?.investors?.score)}
                            {getBadge('Growth', companyScores?.growth?.score)}
                            {getBadge('Fit', companyScores?.mandateFit?.score)}
                        </div> */}
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
          <span className="font-body text-body text-default-font">{company.description}</span>
        </div>
      </div>
    </Link>
  )
}

export default SearchResult
