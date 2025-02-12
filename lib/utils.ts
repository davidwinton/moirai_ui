import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toTitleCase = (str: string) => {
  if (!str) {
    return ""
  }
  return str
    .toLowerCase()
    .replace("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const formatDate = (date: string, justYear: boolean) => {
  if (justYear) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
    })
  }
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
export const formatNumber = (amount: number | null | undefined) => {
  if (!amount) {
    return "N/A"
  }

  const suffixes = ["", "k", "m", "b", "t"] // k = thousand, m = million, etc.
  const tier = Math.floor(Math.log10(Math.abs(amount)) / 3) // Determine the tier (thousands, millions, etc.)

  if (tier === 0) {
    return `$${amount}` // No suffix for values below 1,000
  }

  const scaled = amount / Math.pow(1000, tier) // Scale the number to the tier
  const suffix = suffixes[tier] // Get the appropriate suffix

  return `${scaled.toFixed(1)}${suffix}` // Format to 1 decimal place
}

export const formatPercentage = (amount: number | undefined) => {
  if (!amount) {
    return "N/A"
  }
  return `${amount}%`
}

const tier_1 = [
  "maven capital",
  "a16z crypto",
  "binance labs",
  "digital currency group",
  "animoca brands",
  "animoca ventures",
  "andreessen horowitz",
  "pantera capital",
  "coinbase",
  "sequoia capital",
  "paradigm",
  "polychain capital",
  "lightspeed venture partners",
]

const tier_2 = [
  "dragonfly",
  "framework ventures",
  "1kx",
  "delphi digital",
  "spartan group",
  "mechanism capital",
  "hashed",
  "union square ventures",
  "galaxy digital",
  "blockchain capital",
]

const tier_3 = [
  "metastable capital",
  "gumi cryptos",
  "1confirmation",
  "arrington xrp capital",
  "fbg capital",
  "protocol ventures",
  "blueyard capital",
  "fenbushi capital",
  "consensys ventures",
  "placeholder vc",
  "electric capital",
  "boost vc",
  "blocktower capital",
]

export const getInvestorRank = (investor: string) => {
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
