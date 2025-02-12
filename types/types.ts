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
