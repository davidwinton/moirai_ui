"use client";

import React from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { Badge } from "@/subframe/components/Badge";
import { VerticalStepper } from "@/subframe/components/VerticalStepper";
import * as SubframeCore from "@subframe/core";
import { CustomTreeView } from "@/subframe/components/CustomTreeView";
import { notFound } from "next/navigation";


import { IconButton } from "@/subframe/components/IconButton";
import { Avatar } from "@/subframe/components/Avatar";
import { Button } from "@/subframe/components/Button";
import { Label } from "@subframe/core/dist/cjs/components/radix/context-menu";
import { get } from "http";
import InvestorsList from "components/InvestorList/InvestorList";

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

type Investor = {
  name: string;
  logoUrl?: string | undefined;
  websiteUrl?: string | undefined;
  description?: string | undefined;
  rank?: number | undefined;
  relevance?: number | undefined;
}

type FundingRound = {
  round: string;
  amount?: number;
  date?: string;
  leads: Investor[] | undefined;
  followers: Investor[] | undefined;
}

type DataPoint = {
  label: string | undefined;
  value: number | undefined;
  date: string | undefined;
}

type Growth = {
  name: string;
  unit: string | undefined;
  data: DataPoint[] | undefined;
}

type CoreDetails = {
  id: string;
  name: string;
  description: string | undefined;
  foundingDate: string | undefined;
  lastRoundDate: string | undefined;
  lastRound: string | undefined;
  lastRoundAmount: number | undefined;
  totalRaised: number | undefined;
  tvl: number | undefined;
  headcount: number | undefined;
  headcountGrowth: number | undefined;
  mau: number | undefined;
  mauGrowth: number | undefined;
}

type Links = {
  websiteUrl: string | undefined;
  logoUrl: string | undefined;
  crunchbaseUrl?: string;
  linkedinUrl?: string;
  pitchbookUrl?: string;
  affinityUrl?: string;
}

type Company = {
  id: string;
  name: string;
  description: string | undefined;
  links: Links | undefined;
  categories: string[] | undefined;
  categoryGroups: string[] | undefined;
  businessType: string | undefined;
  details: CoreDetails | undefined;
  score: CompanyScore | undefined;
  fundingHistory: FundingRound[] | undefined;
  growthMeasures: Growth[] | undefined;
};

type CompanyTearSheet = {
  id: string;
  name: string;
  description: string | undefined;
  websiteUrl: string | undefined;
  logoUrl: string | undefined;
  categories: string[] | undefined;
  categoryGroups: string[] | undefined;
  businessType: string | undefined;
  crunchbaseUrl: string | undefined;
  linkedinUrl: string | undefined;
  pitchbookUrl: string | undefined;
  affinityUrl: string | undefined;
  foundingDate: string | undefined;
  lastRoundDate: string | undefined;
  lastRound: string | undefined;
  lastRoundAmount: number | undefined;
  totalRaised: number | undefined;
  tvl: number | undefined;
  headcount: number | undefined;
  headcountGrowth: number | undefined;
  mau: number | undefined;
  mauGrowth: number | undefined;
  overallScore: number | undefined;
  teamScore: number | undefined;
  growthScore: number | undefined;
  investorsScore: number | undefined;
  mandateFitScore: number | undefined;
}

const findCompanyById = (id: string): Company | null => {
  return (parseInt(id) % 2) == 0 ? null : {
    id,
    name: "Ethena Labs",
    description: "Ethena provides derivative infrastructure in order to transform Ethereum into the first crypto-native yield bearing stablecoin.",
    links: {
      logoUrl: "https://res.cloudinary.com/subframe/image/upload/v1725459945/uploads/3896/wf18my0jclzl62ajsuts.webp",
      websiteUrl: "https://ethena.com",
      crunchbaseUrl: "https://www.crunchbase.com/organization/ethena-b5a5",
    },
    categories: ["Blockchain", "Cryptocurrency"],
    categoryGroups: [],
    businessType: "Basis Trading", //Note: This should be from DefiLlama and is not actually the category groups
    details: {
      id,
      name: "Ethena Labs",
      description: "Ethena provides derivative infrastructure in order to transform Ethereum into the first crypto-native yield bearing stablecoin.",
      foundingDate: '2020-01-01',
      lastRoundDate: '2023-01-01',
      lastRound: "Seed",
      lastRoundAmount: 20_500_000,
      totalRaised: 20_500_000,
      tvl: 2_700_000_000,
      headcount: 14,
      headcountGrowth: .4,
      mau: 326200,
      mauGrowth: -.11,
    },
    score: {
      overall: {
        metric: "Overall",
        score: 92,
        category: "Overall",
        orderId: 1,
      },
      team: {
        metric: "Team",
        score: 90,
        category: "Team",
        orderId: 2,
      },
      growth: {
        metric: "Growth",
        score: 80,
        category: "Growth",
        orderId: 3,
      },
      investors: {
        metric: "Investors",
        score: 95,
        category: "Investors",
        orderId: 4,
      },
      mandateFit: {
        metric: "Mandate Fit",
        score: undefined,
        category: "Mandate Fit",
        orderId: 5,
      },
      subscores: [

      ]

    },
    fundingHistory: [{
      round: "Seed",
      amount: 20_500_000,
      date: "2023-01-01",
      leads: [{
        name: "Dragonfly",
        logoUrl: "https://res.cloudinary.com/subframe/image/upload/v1725459945/uploads/3896/wf18my0jclzl62ajsuts.webp",
        websiteUrl: "https://ethena.com",
        rank: 2
      }, {
        name: "BH Digital"
      }
      ],
      followers: [
        { name: "Franklin Templeton", rank: 1 },
        { name: "Wintermute", rank: 2 },
        { name: "OKX" },
        { name: "Arthur Hayes" },
        { name: "Bybit" },
        { name: "Maelstrom" },
        { name: "Deribit" },
        { name: "Gemini" },
        { name: "GSR" },
        { name: "BitMEX" },
        { name: "Binance Labs" },
        { name: "Avon Ventures" },
        { name: "philip morris" },
        { name: "Hashed" },
        { name: "Galaxy Digital" }
      ]
    }],
    growthMeasures: undefined,
  }
};

const toTearsheet = (company: Company): CompanyTearSheet => {
  return {
    id: company.id,
    name: company.name,
    description: company.description,
    websiteUrl: company?.links?.websiteUrl,
    logoUrl: company?.links?.logoUrl,
    categories: company.categories,
    categoryGroups: company.categoryGroups,
    businessType: company.businessType,
    crunchbaseUrl: company.links?.crunchbaseUrl,
    linkedinUrl: company.links?.linkedinUrl,
    pitchbookUrl: company.links?.pitchbookUrl,
    affinityUrl: company.links?.affinityUrl,
    foundingDate: company.details?.foundingDate,
    lastRoundDate: company?.details?.lastRoundDate,
    lastRound: company?.details?.lastRound,
    lastRoundAmount: company?.details?.lastRoundAmount,
    totalRaised: company?.details?.totalRaised,
    tvl: company.details?.tvl,
    headcount: company.details?.headcount,
    headcountGrowth: company.details?.headcountGrowth,
    mau: company.details?.mau,
    mauGrowth: company.details?.mauGrowth,
    overallScore: company.score?.overall?.score,
    teamScore: company.score?.team?.score,
    growthScore: company.score?.growth?.score,
    investorsScore: company.score?.investors?.score,
    mandateFitScore: company.score?.mandateFit?.score,
  }
}

const getBadge = (label: string, score: number | undefined) => {
  if (!score) {
    return <Badge>{label}</Badge>
  }

  const variant = score > 90 ? 'success' : score > 80 ? 'neutral' : 'warning';

  return <Badge variant={variant}>{`${label}: ${score}`}</Badge>
}

const formatNumber = (amount: number | undefined) => {
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
  return `${amount * 100}%`
}


const getPercentageSpan = (amount: number | undefined) => {
  if (!amount) {
    return <span className="text-body font-body text-neutral-400">N/A</span>
  }
  if (amount > 0) {
    return <span className="text-body font-body text-success-700">{formatPercentage(amount)}</span>
  }

  return <span className="text-body font-body text-error-700">{formatPercentage(amount)}</span>
}

function CompanyDetails({ params }: { params: { id: string } }) {
  const company = findCompanyById(params.id);

  if (!company) {
    notFound();
  }
  const companyDetails = toTearsheet(company);

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-4 bg-neutral-50 px-6 py-12 overflow-auto">
        <div className="flex w-full min-w-[320px] flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm mobile:w-full mobile:grow mobile:shrink-0 mobile:basis-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <a href={companyDetails.websiteUrl} target="_blank">
                <img
                  className="max-h-[40px] flex-none"
                  src={companyDetails.logoUrl || './images/ethena.png'}
                />
              </a>
              <span className="text-heading-2 font-heading-2 text-default-font">
                {companyDetails.name}
              </span>

            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">92</Badge>
              {companyDetails?.crunchbaseUrl ? (
                <a href={companyDetails.crunchbaseUrl} target="_blank">
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
              {companyDetails?.pitchbookUrl ? (
                <a href={companyDetails.pitchbookUrl} target="_blank">
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

              {companyDetails?.affinityUrl ? (
                <a href={companyDetails.affinityUrl} target="_blank">
                  <img
                    className="max-h-[40px] flex-none"
                    src="/images/affinity.png"
                  />
                </a>) : (
                <img
                  className="max-h-[40px] flex-none"
                  src="/images/affinity_gray.png"
                />
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-start gap-2 px-1 py-1">
              {companyDetails?.categories?.map((category) => (
                <Badge key={category}>{category}</Badge>
              ))}
              {companyDetails?.businessType && <Badge key={companyDetails?.businessType} variant="neutral">{companyDetails?.businessType}</Badge>}
            </div>
            <VerticalStepper />
            <div className="flex items-start gap-2 px-1 py-1 float-right">
              {getBadge('Overall', companyDetails?.overallScore)}
              {getBadge('Team', companyDetails?.teamScore)}
              {getBadge('Investors', companyDetails?.investorsScore)}
              {getBadge('Growth', companyDetails?.growthScore)}
              {getBadge('Fit', companyDetails?.mandateFitScore)}
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
          <span className="text-body font-body text-default-font">
            Ethena provides derivative infrastructure in order to transform
            Ethereum into the first crypto-native yield bearing stablecoin.
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
                {companyDetails?.foundingDate}
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <span className="text-body font-body text-default-font">
                Stage
              </span>
              <span className="text-body font-body text-default-font">
                Seed
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
                ${formatNumber(companyDetails?.totalRaised)}
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
                ${formatNumber(companyDetails?.tvl)}
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <span className="text-body font-body text-default-font">
                Headcount
              </span>
              <span className="text-body font-body text-default-font">{companyDetails?.headcount}</span>
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
              {getPercentageSpan(companyDetails?.headcountGrowth)}
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
                {formatNumber(companyDetails?.mau)}
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
              {getPercentageSpan(companyDetails?.mauGrowth)}
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6">
            {company?.fundingHistory?.map((fundingRound) => (
              <CustomTreeView>
                <CustomTreeView.Folder label={fundingRound.round + (fundingRound.date ? ' (' + fundingRound.date + ')' : '')} value={'$' + formatNumber(fundingRound.amount)}>
                  <div className="flex w-full h-auto items-center justify-between">
                    <CustomTreeView.Item
                      className="h-auto w-auto flex-none"
                      label="Leads"
                      value=""
                    />

                    <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
                      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 px-1 py-1">
                        {company?.fundingHistory?.[0]?.leads ? (<InvestorsList investors={company?.fundingHistory?.[0]?.leads} />) : null}
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
                        {company?.fundingHistory?.[0]?.followers ? (<InvestorsList investors={company?.fundingHistory?.[0]?.followers} />) : null}
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
                  <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                    <div className="flex h-52 w-full flex-none items-center gap-2">
                      <img
                        className="grow shrink-0 basis-0 self-stretch object-contain"
                        src="https://res.cloudinary.com/subframe/image/upload/v1725511131/uploads/3896/g7k3lq4s8ggjcriu5iow.png"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Web Traffic
                </span>
                <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                  <div className="flex h-52 w-full flex-none items-center gap-2">
                    <img
                      className="grow shrink-0 basis-0 self-stretch object-contain"
                      src="https://res.cloudinary.com/subframe/image/upload/v1725510304/uploads/3896/bhcsy4vlwwetkq8fjh5e.png"
                    />
                  </div>
                </div>
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
                <span className="text-heading-3 font-heading-3 text-default-font">
                  TVL
                </span>
                <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                  <img
                    className="h-52 grow shrink-0 basis-0 object-contain"
                    src="https://res.cloudinary.com/subframe/image/upload/v1725510668/uploads/3896/xvtrhvyt15eabntfxulv.png"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default CompanyDetails;