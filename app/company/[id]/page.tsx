"use client";

import React, { useEffect, useState } from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { Badge } from "@/subframe/components/Badge";
import { VerticalStepper } from "@/subframe/components/VerticalStepper";
import * as SubframeCore from "@subframe/core";
import { CustomTreeView } from "@/subframe/components/CustomTreeView";
import { notFound } from "next/navigation";
import { HarmonicResponse, HarmonicInvestor } from "types/harmonicResponse";

import InvestorsList from "components/InvestorList/InvestorList";
import RatingsButton from "components/Rating/RatingsButton";
import MetricChart from "components/MetricChart/MetricChart";
import { Liquidity, Protocol } from "types/defiLlamaResponse";
import { Ratings, CompanyScore, Score } from "types/types";

type DefiDetails = {
  tvl: number | undefined;
  tvlHistory: Liquidity[] | undefined;
}

const score_list = [56556915, 53938838, 18656035, 43276461, 10195420, 55016033, 47467530, 56362167, 23491747, 7584821, 21776594, 4211342, 10909956, 47596274, 11148643, 4160964, 53068584, 55883677, 44597548, 54813562, 57544641, 37066783, 45206273, 42851860, 4116225, 12760858, 56739311, 57028703, 53927583, 41922392, 3081893, 56244584, 12587815, 31723608, 19390514, 38808915, 55218902, 3863172, 56731501, 55560540]
const traction_list = [0.9454024693,0.8573133252,0.7084775039, 0.7084775039,0.979286458,1.15380862,1.060109732,1.104697599,1.035610465,0.8244031162,1.238208423,1.008505991,0.9426683097,0.9119177845,0.4692167619,0.625742862,1.325233381,1.314586459,1.308909138,1.288478579,1.269369842,1.268895106,1.259100924,1.258843782,1.256140359,1.254112058,1.246253549,1.245541662,1.243347265,1.240723887,1.239263786,1.232110137,1.231831264,1.2294076,1.229000718,1.223804307,1.221828471,1.217149372,1.216206262,1.214659937]

const getBadge = (label: string, score: number | undefined) => {
  if (!score) {
    return <Badge key={'badge-' + label}>{label}</Badge>
  }

  const variant = score > 90 ? 'success' : score > 80 ? 'neutral' : 'warning';

  return <Badge variant={variant}>{`${label}: ${score}`}</Badge>
}

const getRatingBadge = (label: string, score: number | undefined) => {
  if (!score) {
    return <Badge key={'badge-' + label}>{label}</Badge>
  }

  const variant = score > 8 ? 'success' : score > 6 ? 'neutral' : 'error';

  return <Badge variant={variant}>{`${label}: ${score}`}</Badge>
}

const toTitleCase = (str: string) => {
  if (!str) {
    return ''
  }
  return str.toLowerCase()
    .replace("_", " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const formatDate = (date: string, justYear: boolean) => {
  if (justYear) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric'
    })
  }
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
const formatNumber = (amount: number | null | undefined) => {
  if (!amount) {
    return 'N/A'
  }

  const suffixes = ["", "k", "m", "b", "t"]; // k = thousand, m = million, etc.
  const tier = Math.floor(Math.log10(Math.abs(amount)) / 3); // Determine the tier (thousands, millions, etc.)

  if (tier === 0) {
    return `$${amount}`; // No suffix for values below 1,000
  }

  const scaled = amount / Math.pow(1000, tier); // Scale the number to the tier
  const suffix = suffixes[tier]; // Get the appropriate suffix

  return `${scaled.toFixed(1)}${suffix}`; // Format to 1 decimal place
}

const formatPercentage = (amount: number | undefined) => {
  if (!amount) {
    return 'N/A'
  }
  return `${amount}%`
}


const getPercentageSpan = (amount: number | null | undefined) => {
  if (!amount) {
    return <span className="text-body font-body text-neutral-400">N/A</span>
  }
  if (amount > 0) {
    return <span className="text-body font-body text-success-700">{formatPercentage(amount)}</span>
  }

  return <span className="text-body font-body text-error-700">{formatPercentage(amount)}</span>
}

const tier_1 = ['maven capital', 'a16z crypto', 'binance labs', 'digital currency group', 'animoca brands', 'animoca ventures', 'andreessen horowitz',
  'pantera capital',
  'coinbase',
  'sequoia capital',
  'paradigm',
  'polychain capital',
  'lightspeed venture partners']

const tier_2 = [
  'dragonfly',
  'framework ventures',
  '1kx',
  'delphi digital',
  'spartan group',
  'mechanism capital',
  'hashed',
  'union square ventures',
  'galaxy digital',
  'blockchain capital'
]

const tier_3 = [
  'metastable capital',
  'gumi cryptos',
  '1confirmation',
  'arrington xrp capital',
  'fbg capital',
  'protocol ventures',
  'blueyard capital',
  'fenbushi capital',
  'consensys ventures',
  'placeholder vc',
  'electric capital',
  'boost vc',
  'blocktower capital'
]


const getInvestorRank = (investor: string) => {
  const inv_lower = investor.toLowerCase()
  if (tier_1.includes(inv_lower)) {
    return 1
  }
  if (tier_2.includes(inv_lower)) {
    return 2
  }
  if (tier_3.includes(inv_lower)) {
    return 3
  }
  return 0
}

type Investor = {
  name: string;
  logoUrl?: string | undefined;
  websiteUrl?: string | undefined;
  description?: string | undefined;
  rank?: number | undefined;
  relevance?: number | undefined;
}
const getLeads = (investors: HarmonicInvestor[] | null): Investor[] => {
  if (!investors) {
    return [];
  }

  return investors.filter(investor => investor.is_lead)?.map(investor => {
    return {
      name: investor.investor_name,
      rank: getInvestorRank(investor.investor_name)
    };
  }) || [];
}

const getFollowers = (investors: HarmonicInvestor[] | null): Investor[] => {
  if (!investors) {
    return [];
  }

  return investors.filter(investor => !investor.is_lead)?.map(investor => {
    return {
      name: investor.investor_name,
      rank: getInvestorRank(investor.investor_name)
    };
  }) || [];
}


const calculateCompanyScore = (company: HarmonicResponse) => {

  if (!company) {

      return null;
  }
  const scoreIndex = score_list.indexOf(company.id)
  const teamScore = Math.min(80 + (company?.employee_highlights?.length || 0), 100)
  const tractionScore = scoreIndex !== -1 ? 50 + 50 * (traction_list[scoreIndex] || 0) / 1.325233381 : 0
  const allInvestors = company.funding_rounds?.map(fundingRound => fundingRound.investors).flat()
  const leads = allInvestors?.filter(investor => investor.is_lead)?.map(investor => getInvestorRank(investor.investor_name))?.map(tier => tier === 0 ? 0 : 5 - tier)
  const followers = allInvestors?.filter(investor => !investor.is_lead)?.map(investor => getInvestorRank(investor.investor_name))?.map(tier => tier === 0 ? 0 : 5 - tier)
  const highestLead = leads?.length ? Math.max(...leads) : 0
  const highestFollower = followers?.length ? Math.max(...followers) : highestLead

  const averageLead = leads?.length ? leads.reduce((a: number, b: number) => a + b, 0) / leads.length : highestLead
  const averageFollower = followers?.length ? followers.reduce((a: number, b: number) => a + b, 0) / followers.length : highestFollower


  const isBlockchain = company.tags_v2.filter(tag => tag.type?.toLowerCase().includes('technology') && tag.display_value?.toLowerCase().includes('blockchain')).length > 0
  const isFinServ = company.tags_v2.filter(tag => tag.type?.toLowerCase().includes('market') && tag.display_value?.toLowerCase().includes('financial')).length > 0

  const scores: CompanyScore = {
      overall: {
          metric: 'overall',
          score: Math.floor(scoreIndex !== -1 ? 93 - scoreIndex / 2 : 0),
      },
      team: {
          metric: 'team',
          score: Math.floor(teamScore)
      },

      growth: {
          metric: 'growth',
          score: Math.floor(tractionScore)
      },
      investors: {
          metric: 'investor',
          score: Math.floor((highestLead + averageLead) * 10 + (highestFollower + averageFollower) * 2.5)
      },
      mandateFit: {
          metric: 'mandate fit',
          score: (isBlockchain ? 70 : 0) + (isFinServ ? 30 : 0)
      },

  }
  return scores

}


function CompanyDetails({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<HarmonicResponse | null>(null);
  const [companyScores, setCompanyScores] = useState<CompanyScore | null>(null);
  const [defiDetails, setDefiDetails] = useState<DefiDetails | null>(null);
  const [ratings, setRatings] = useState<Ratings | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const id = params.id

  useEffect(() => {

    if (id) {
      const fetchCompany = async () => {
        try {
          setIsLoading(true)
          const response = await fetch(`/api/harmonic_company/${id}`)

          if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch company')
          }

          const data = await response.json() as HarmonicResponse
          setCompany(data)
          setCompanyScores(calculateCompanyScore(data))

          if (data) {
            if (data.name === 'Ethena Labs') {
              fetchDefiDetails('ethena')
            }
          }
          fetchRatings()
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message)
          }
          else {
            setError('Something went wrong')
          }
        } finally {
          setIsLoading(false)
        }
      }

      const fetchDefiDetails = async (companyName: string) => {
        try {
          const response = await fetch(`/api/defillama/${companyName}`)

          if (!response.ok) {
            console.log(response)
            setDefiDetails(null)
          }

          const data = await response.json() as Protocol
          const tvlHistory = data.chainTvls?.Ethereum?.tvl
          const tvl = tvlHistory?.[tvlHistory.length - 1]?.totalLiquidityUSD
          setDefiDetails({
            tvl: tvl,
            tvlHistory: tvlHistory
          })

        } catch (err) {
          if (err instanceof Error) {
            setError(err.message)
          }
          else {
            setError('Something went wrong with DefiLlama integration')
          }
        }
      }

      const fetchRatings = async () => {
        try {
          const response = await fetch(`/api/ratings/${id}`)

          if (!response.ok) {
            console.log(response)
            setRatings(null)
          }

          const data = await response.json() as Ratings
          
          setRatings(data)

        } catch (err) {
          if (err instanceof Error) {
            console.error(err.message)
          }
          else {
            console.error('Something went wrong with DefiLlama integration')
          }
        }
      }

      

      fetchCompany()

    }
  }, [id])

  const scoreIndex = score_list.indexOf(Number(id))
  const overallScore = scoreIndex !== -1 ? 93 - scoreIndex / 2 : ''

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  if (!company) {
    notFound();
  }

  const updateRatings = async (ratings: Ratings) => {
    try {
      const response = await fetch(`/api/ratings/${id}`,
        {
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratings),
    })

      if (!response.ok) {
        setRatings(null)
        return;
      }

      const data = await response.json() as Ratings
      
      setRatings(data);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
      else {
        setError('Something went wrong with updating ratings')
      }
    }
  }

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-4 bg-neutral-50 px-6 py-12 overflow-auto">
        <div className="flex w-full min-w-[320px] flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm mobile:w-full mobile:grow mobile:shrink-0 mobile:basis-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <a href={company?.website?.url} target="_blank">
                <img
                  className="max-h-[40px] flex-none"
                  src={company?.logo_url}
                />
              </a>
              <span className="text-heading-2 font-heading-2 text-default-font">
                {company.name}
              </span>

            </div>
            <RatingsButton onSubmit={updateRatings} />
            <div className="flex items-center gap-2">
              {!!ratings?.quality ? (getRatingBadge('Q', ratings?.quality)) : null}
              {!!ratings?.fit ? (getRatingBadge('F', ratings?.fit)) : null}
              {ratings?.investors ? (getRatingBadge('I', ratings?.investors)) : null}
              {ratings?.team ? (getRatingBadge('T', ratings?.team)) : null}
              {!!overallScore && <Badge variant="success">{'' + overallScore}</Badge>}
              {company.id ? (
                <a href={"https://console.harmonic.ai/dashboard/company/" + company.id} target="_blank">
                  <img
                    className="max-h-[40px] flex-none"
                    src="/images/crunchbase.png"
                  />
                </a>) : (
                <img
                  className="max-h-[40px] flex-none"
                  src="/images/crunchbase_gray.png"
                />
              )}
              {company?.socials['PITCHBOOK'] ? (
                <a href={company?.socials['PITCHBOOK'].url} target="_blank">
                  <img
                    className="max-h-[40px] flex-none"
                    src="/images/pitchbook.png"
                  />
                </a>) : (
                <img
                  className="max-h-[40px] flex-none"
                  src="/images/pitchbook_gray.png"
                />
              )}
              {company?.socials['LINKEDIN'] ? (
                <a href={company?.socials['LINKEDIN'].url} target="_blank">
                  <img
                    className="max-h-[40px] flex-none"
                    src="/images/linkedin.png"
                  />
                </a>) : (
                <img
                  className="max-h-[40px] flex-none"
                  src="/images/linkedin_gray.png"
                />
              )}
              {company?.socials['TWITTER'] ? (
                <a href={company?.socials['TWITTER'].url} target="_blank">
                  <img
                    className="max-h-[40px] flex-none"
                    src="/images/twitter.png"
                  />
                </a>) : (
                <img
                  className="max-h-[40px] flex-none"
                  src="/images/twitter_gray.png"
                />
              )}

              <img
                className="max-h-[40px] flex-none"
                src="/images/affinity_gray.png"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-start gap-2 px-1 py-1">
              {company?.tags_v2?.map((category) => (
                <Badge key={category.display_value}>{category.display_value}</Badge>
              ))}
              {company?.customer_type && <Badge key={company?.customer_type} variant="neutral">{company?.customer_type}</Badge>}
            </div>
            <VerticalStepper />

            <div className="flex items-start gap-2 px-1 py-1 float-right">
              {getBadge('Overall', companyScores?.overall?.score)}
              {getBadge('Team', companyScores?.team?.score)}
              {getBadge('Investors', companyScores?.investors?.score)}
              {getBadge('Growth', companyScores?.growth?.score)}
              {getBadge('Fit', companyScores?.mandateFit?.score)}
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
          <span className="text-body font-body text-default-font">
            {company.description}
          </span>
          <div className="flex w-full items-start gap-2 px-1 py-1">
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherBookOpen"
                />
                <span className="text-body font-body text-default-font">
                  Founded
                </span>
              </div>
              <span className="text-body font-body text-default-font">
                {formatDate(company.founding_date.date, true) ?? company.founding_date.date}
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <span className="text-body font-body text-default-font">
                Stage
              </span>
              <span className="text-body font-body text-default-font">
                {toTitleCase(company.stage)}
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherBanknote"
                />
                <span className="text-body font-body text-default-font">
                  Raised
                </span>
              </div>
              <span className="text-body font-body text-default-font">
                ${formatNumber(company?.funding?.funding_total)}
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherBanknote"
                />
                <span className="text-body font-body text-default-font">
                  TVL
                </span>
              </div>
              <span className="text-body font-body text-default-font">
                ${formatNumber(defiDetails?.tvl)}
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <span className="text-body font-body text-default-font">
                Headcount
              </span>
              <span className="text-body font-body text-default-font">{company.headcount}</span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherTriangle"
                />
                <span className="text-body font-body text-default-font">
                  Headcount
                </span>
              </div>
              {getPercentageSpan(company.traction_metrics.headcount?.["90d_ago"]?.percent_change)}
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherActivity"
                />
                <span className="text-body font-body text-default-font">
                  MAU
                </span>
              </div>
              <span className="text-body font-body text-default-font">
                {formatNumber((company?.traction_metrics?.web_traffic["30d_ago"]?.value || 0) + (company?.traction_metrics?.web_traffic["30d_ago"]?.change || 0))}
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherTriangle"
                />
                <span className="text-body font-body text-default-font">
                  MAU
                </span>
              </div>
              {getPercentageSpan(company?.traction_metrics?.web_traffic["30d_ago"]?.percent_change)}
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6">
            {company.funding_rounds?.map((fundingRound) => (


              <CustomTreeView>
                <CustomTreeView.Folder label={toTitleCase(fundingRound.funding_round_type) + (fundingRound.announcement_date ? ' (' + formatDate(fundingRound.announcement_date, false) + ')' : '')} value={'$' + formatNumber(fundingRound.funding_amount)}>
                  <div className="flex w-full h-auto items-center justify-between">
                    <CustomTreeView.Item
                      className="h-auto w-auto flex-none"
                      label="Leads"
                      value=""
                    />

                    <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
                      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 px-1 py-1">
                        {getLeads(fundingRound?.investors) ? (<InvestorsList investors={getLeads(fundingRound?.investors)} />) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full h-auto items-center justify-between">
                    <CustomTreeView.Item
                      className="h-auto w-auto flex-none"
                      label="Followers"
                      value=""
                    />

                    <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
                      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 px-1 py-1">
                        {getFollowers(fundingRound?.investors) ? (<InvestorsList investors={getFollowers(fundingRound?.investors)} />) : null}
                      </div>
                    </div>
                  </div>

                </CustomTreeView.Folder>

              </CustomTreeView>
            ))}
          </div>
        </div>
        <span className="text-heading-2 font-heading-2 text-default-font">
          Growth
        </span>
        <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start gap-6">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch">
            <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                <div className="flex w-full flex-col items-start gap-4">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Headcount
                  </span>
                  {company.traction_metrics.headcount?.metrics ? (
                    <>

                      <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                        <MetricChart chartLabel="Headcount" yAxisLabel="Employees" data={company?.traction_metrics?.headcount.metrics} />
                      </div>
                    </>) : (<>
                      <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                        <div className="flex h-52 w-full flex-none items-center gap-2">
                          <img
                            className="grow shrink-0 basis-0 self-stretch object-contain"
                            src="https://res.cloudinary.com/subframe/image/upload/v1725510304/uploads/3896/bhcsy4vlwwetkq8fjh5e.png"
                          />
                        </div>
                      </div>
                    </>)}

                </div>
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Web Traffic
                </span>
                {company.traction_metrics.web_traffic?.metrics ? (
                  <>

                    <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                      <MetricChart chartLabel="Web Traffic" yAxisLabel="Monthly Visitors" data={company?.traction_metrics?.web_traffic.metrics} />
                    </div>
                  </>) : (<>
                    <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                      <div className="flex h-52 w-full flex-none items-center gap-2">
                        <img
                          className="grow shrink-0 basis-0 self-stretch object-contain"
                          src="https://res.cloudinary.com/subframe/image/upload/v1725510304/uploads/3896/bhcsy4vlwwetkq8fjh5e.png"
                        />
                      </div>
                    </div>
                  </>)}
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                {/* <div className="flex w-full flex-col items-start gap-4">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Trends
                  </span>
                  <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                    <div className="flex h-52 w-full flex-none items-center gap-2">
                      <img
                        className="grow shrink-0 basis-0 self-stretch object-contain"
                        src="https://res.cloudinary.com/subframe/image/upload/v1725509614/uploads/3896/cfk1kpxb8mytv94hqvej.png"
                      />
                    </div>
                  </div>
                </div> */}
                {defiDetails?.tvlHistory ? (
                  <>
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      TVL
                    </span>
                    <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                      <div className="flex h-600 w-full flex-none items-center gap-2">
                        <MetricChart chartLabel="TVL over Time" yAxisLabel="USD" data={defiDetails?.tvlHistory?.map((item: any) => ({ timestamp: 1000* item.date, metric_value: item.totalLiquidityUSD }))} />
                      </div>
                    </div>
                  </>) : null}
                {company.traction_metrics.linkedin_follower_count?.metrics ? (
                  <>
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      LinkedIn Followers
                    </span>
                    <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                      <MetricChart chartLabel="LinkedIn Follower Count" yAxisLabel="Followers" data={company?.traction_metrics?.linkedin_follower_count.metrics} />
                    </div>
                  </>) : null}
              </div>
            </div>

          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default CompanyDetails;