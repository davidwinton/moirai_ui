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

type Score = {
  metric: string;
  score: number | undefined;
  category: string | undefined;
  orderId: number | undefined;
}
type CompanyScore = {
  overall: Score | undefined;
  team: Score | undefined;
  growth: Score | undefined;
  investors: Score | undefined;
  mandateFit: Score | undefined;
  subscores: Score[] | undefined;
}

type DefiDetails = {
  businessType: string | undefined;
  tvl: number | undefined;
}

const scores = [56556915,53938838,18656035, 43276461,10195420,55016033,47467530,56362167,23491747,7584821,21776594,4211342,10909956,47596274,11148643,4160964,53068584,55883677,44597548,54813562,57544641,37066783,45206273,42851860,4116225,12760858,56739311,57028703,53927583,41922392,3081893,56244584,12587815,31723608,19390514,38808915,55218902,3863172,56731501,55560540]

const getScores = (company: HarmonicResponse) => {
  const scores = [

  ]
}


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

type Rating = {
  quality: number,
  fit: number,
  team: number,
  investors: number
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

function CompanyDetails({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<HarmonicResponse | null>(null);
  const [companyScores, setCompanyScores] = useState<CompanyScore | null>(null);
  const [defiDetails, setDefiDetails] = useState<DefiDetails | null>(null);
  const [ratings, setRatings] = useState<Rating | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const id = params.id

  const handleSubmitRatings = (ratings: { quality: number; fit: number; team: number; investors: number }) => {
    console.log('Ratings Submitted:', ratings);
    setRatings(ratings)
  };

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

      fetchCompany()

    }
  }, [id])

  const scoreIndex = scores.indexOf(Number(id))
  const overallScore = scoreIndex !== -1 ? 93 - scoreIndex / 2 : ''

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  if (!company) {
    notFound();
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
            <RatingsButton onSubmit={handleSubmitRatings} />
            <div className="flex items-center gap-2">
              {ratings?.quality ? (getRatingBadge('Q', ratings?.quality)) : null}
              {ratings?.fit ? (getRatingBadge('F', ratings?.fit)) : null}
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
                      <MetricChart chartLabel="Headcount" data={company?.traction_metrics?.headcount.metrics} />
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
                      <MetricChart chartLabel="Web Traffic" data={company?.traction_metrics?.web_traffic.metrics} />
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
                <div className="flex w-full flex-col items-start gap-4">
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
                </div>
                {defiDetails?.tvl ? (
                  <>
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      TVL
                    </span>
                    <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                      <img
                        className="h-52 grow shrink-0 basis-0 object-contain"
                        src="https://res.cloudinary.com/subframe/image/upload/v1725510668/uploads/3896/xvtrhvyt15eabntfxulv.png"
                      />
                    </div>
                  </>) : null}
                {company.traction_metrics.linkedin_follower_count?.metrics ? (
                  <>
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      LinkedIn Followers
                    </span>
                    <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                      <MetricChart chartLabel="LinkedIn Follower Count" data={company?.traction_metrics?.linkedin_follower_count.metrics} />
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