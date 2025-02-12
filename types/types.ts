import { Liquidity } from "types/defiLlamaResponse"

export type Ratings = {
  quality: number
  fit: number
  team: number | ""
  investors: number | ""
}

export type Score = {
  metric: string
  score: number | undefined
  category?: string | undefined
  orderId?: number | undefined
}

export type CompanyScore = {
  overall?: Score | undefined
  team?: Score | undefined
  growth?: Score | undefined
  investors?: Score | undefined
  mandateFit?: Score | undefined
  subscores?: Score[] | undefined
}

export type Investor = {
  name: string
  logoUrl?: string | undefined
  websiteUrl?: string | undefined
  description?: string | undefined
  rank?: number | undefined
  relevance?: number | undefined
}

export type DefiDetails = {
  tvl: number | undefined
  tvlHistory: Liquidity[] | undefined
}

export interface Session {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
}