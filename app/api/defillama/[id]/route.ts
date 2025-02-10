import axios from 'axios';
import { NextResponse } from 'next/server';

const DEFI_LLAMA_API_URL = 'https://api.llama.fi/updatedProtocol/';

/**
 * Fetch data from the DefiLlama API.
 * @param {object} params - Optional query parameters for the API call.
 * @returns {Promise<any>} - The API response data.
 */

export async function GET ( request: NextFetchRequestConfig, { params }: { params: { id: string }}) {
  const { id } = await params;
  try {
    const response = await axios.get(DEFI_LLAMA_API_URL + id, {
      headers: {
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