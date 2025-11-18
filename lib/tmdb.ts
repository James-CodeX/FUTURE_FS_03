// TMDb API client - get your free API key from https://www.themoviedb.org/settings/api
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'demo'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NETLIFY) return process.env.URL || ''
  return `http://localhost:${process.env.PORT || 3000}`
}

export interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  overview: string
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface TvShow extends Movie {
  name: string
  first_air_date: string
}

export const GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}

// Get image URL
export function getImageUrl(path: string | null, size: 'small' | 'medium' | 'large' = 'medium') {
  if (!path) return '/abstract-movie-poster.png'
  const sizeMap = { small: 'w300', medium: 'w500', large: 'w780' }
  return `${IMAGE_BASE_URL}${path}`
}

export async function getTrendingMovies() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/trending-movies`)
    return await res.json()
  } catch {
    return []
  }
}

export async function getPopularMovies() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/popular-movies`)
    return await res.json()
  } catch {
    return []
  }
}

export async function getTopRatedMovies() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/top-rated-movies`)
    return await res.json()
  } catch {
    return []
  }
}

export async function getUpcomingMovies() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/upcoming-movies`)
    return await res.json()
  } catch {
    return []
  }
}

export async function getPopularTvShows() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/popular-tv`)
    return await res.json()
  } catch {
    return []
  }
}

export async function getTopRatedTvShows() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/top-rated-tv`)
    return await res.json()
  } catch {
    return []
  }
}

export async function getTrendingTvShows() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/trending-tv`)
    return await res.json()
  } catch {
    return []
  }
}

export async function getMoviesByGenre(genreId: number) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/genre-movies?genreId=${genreId}`)
    return await res.json()
  } catch {
    return []
  }
}

export async function searchMovies(query: string) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/search?q=${encodeURIComponent(query)}`)
    return await res.json()
  } catch {
    return []
  }
}

export async function getMovieDetails(movieId: number) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/movie/${movieId}`)
    return await res.json()
  } catch {
    return null
  }
}

export async function getMovieCredits(movieId: number) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/movie/${movieId}/credits`)
    return await res.json()
  } catch {
    return null
  }
}

export async function getSimilarMovies(movieId: number) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tmdb/movie/${movieId}/similar`)
    return await res.json()
  } catch {
    return []
  }
}
