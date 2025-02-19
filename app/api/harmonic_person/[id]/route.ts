import axios from "axios"
import { NextResponse } from "next/server"
import { getCached, setCache } from "lib/cache"

const HARMONIC_API_URL = "https://api.harmonic.ai/" // Replace with the actual endpoint

/**
 * Fetch data from the Harmonic API.
 * @param {string} apikey - The API key for authentication.
 * @param {object} params - Optional query parameters for the API call.
 * @returns {Promise<any>} - The API response data.
 */

export async function GET(request: NextFetchRequestConfig, { params }: { params: { id: string } }) {
  const { id } = params
  const cacheKey = `harmonic_person_${id}`
  const cachedData = await getCached(cacheKey)
  if (cachedData) {
    return NextResponse.json(cachedData)
  }
  const apikey = process.env.NEXT_PUBLIC_HARMONIC_API_KEY

  
  try {
    const response = await axios.get(HARMONIC_API_URL + "persons?urns=urn:harmonic:person:" + id, {
      headers: {
        apikey: apikey,
        "Content-Type": "application/json",
      },
      params,
    })
    const data = response.data
    setCache(cacheKey, data)
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error fetching Harmonic data:", error.response?.data || error.message)
    throw new Error(error.response?.data?.message || "Failed to fetch data")
  }
}
