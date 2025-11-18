import { NextResponse } from 'next/server'

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || ''
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const genreId = searchParams.get('genreId')

  if (!genreId) {
    return NextResponse.json([], { status: 400 })
  }

  try {
    const res = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=1`, {
      next: { revalidate: 3600 }
    })
    const data = await res.json()
    return NextResponse.json(data.results || [])
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
