// pages/api/ratings.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCached, setCache } from 'lib/cache';
import { Ratings } from 'types/types';

export async function GET ( request: NextFetchRequestConfig, { params }: { params: { id: string }}) {
    const { id } = params;
    const cacheKey = 'ratings_' + id;
    
    const cachedData = await getCached(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData); 
    } else {
      return NextResponse.json({
        success: false,
        message: 'No ratings found in the cache.',
        data: undefined,
      });
    }
  };

  export async function POST ( request: NextRequest, { params }: { params: { id: string }}) {
    
    const { id } = params;
    const cacheKey = 'ratings_' + id;
    const body: Ratings = await request.json() as Ratings;;
    
    // Validate the input
    if (typeof body.quality !== 'number' || typeof body.fit !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Invalid ratings format. Quality and Fit are required as numbers.' },
        { status: 400 }
      );
    }
    setCache(cacheKey, body);
    return NextResponse.json( body );
  
  };
