import axios from 'axios';
import { NextResponse } from 'next/server';

const HARMONIC_API_URL = 'https://api.harmonic.ai/'; // Replace with the actual endpoint

/**
 * Fetch data from the Harmonic API.
 * @param {string} apikey - The API key for authentication.
 * @param {object} params - Optional query parameters for the API call.
 * @returns {Promise<any>} - The API response data.
 */

export async function GET ( request: NextFetchRequestConfig, { params }: { params: { id: string }}) {
  const { id } = params;
  const apikey = process.env.NEXT_PUBLIC_HARMONIC_API_KEY;
  //{ params }: { params: { id: string } }) { const { id } = params; const apikey = process.env.HARMONIC_API_KEY; const companyId = id; const params = {}) => {
  try {
    const response = await axios.get(HARMONIC_API_URL + 'companies/' + id, {
      headers: {
        'apikey': apikey,
        'Content-Type': 'application/json',
      },
      params,
    });
    return NextResponse.json(response.data); 
  } catch (error: any) {
    console.error('Error fetching Harmonic data:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch data');
  }
};