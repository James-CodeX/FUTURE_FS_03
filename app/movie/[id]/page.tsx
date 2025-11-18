import { getMovieDetails, getMovieCredits, getSimilarMovies, getImageUrl, GENRES } from '@/lib/tmdb'
import Header from '@/components/header'
import ShowCard from '@/components/show-card'
import { Play, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movieId = parseInt(params.id)
  const [movieDetails, credits, similarMovies] = await Promise.all([
    getMovieDetails(movieId),
    getMovieCredits(movieId),
    getSimilarMovies(movieId),
  ])

  if (!movieDetails) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 px-6 lg:px-12 text-center">
          <p className="text-xl text-gray-400">Movie not found</p>
        </div>
      </main>
    )
  }

  const backdropUrl = getImageUrl(movieDetails.backdrop_path, 'large')
  const posterUrl = getImageUrl(movieDetails.poster_path, 'large')
  const directorAndCast = credits?.crew?.slice(0, 3) || []
  const cast = credits?.cast?.slice(0, 5) || []
  const genreNames = movieDetails.genres?.map((g: any) => g.name) || []

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button */}
      <Link href="/" className="absolute top-24 left-6 lg:left-12 z-40 flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
        <ChevronLeft size={24} />
        <span>Back</span>
      </Link>

      {/* Hero Section */}
      <div className="relative h-96 lg:h-screen overflow-hidden">
        <img
          src={backdropUrl || "/placeholder.svg"}
          alt={movieDetails.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 lg:px-12 max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-balance">{movieDetails.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-accent text-3xl font-bold">{movieDetails.vote_average.toFixed(1)}</span>
                <span className="text-accent text-xl">★</span>
              </div>
              <span className="text-gray-400">{movieDetails.runtime} min</span>
              <span className="text-gray-400">{new Date(movieDetails.release_date).getFullYear()}</span>
            </div>

            <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-xl">{movieDetails.overview}</p>

            <div className="flex gap-4 flex-wrap">
              <button className="flex items-center gap-2 bg-accent text-background px-8 py-3 rounded font-bold text-lg hover:bg-accent/80 transition-all duration-200 active:scale-95">
                <Play size={24} fill="currentColor" />
                Play
              </button>
              <button className="px-8 py-3 border-2 border-gray-500 text-white rounded font-bold hover:border-white transition-colors">
                Add to List
              </button>
            </div>

            {/* Details */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {genreNames.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Genres</p>
                  <p className="text-white">{genreNames.join(', ')}</p>
                </div>
              )}
              {movieDetails.budget > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Budget</p>
                  <p className="text-white">${(movieDetails.budget / 1000000).toFixed(0)}M</p>
                </div>
              )}
              {movieDetails.revenue > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Revenue</p>
                  <p className="text-white">${(movieDetails.revenue / 1000000).toFixed(0)}M</p>
                </div>
              )}
            </div>
          </div>

          {/* Poster Image */}
          <div className="hidden lg:block absolute right-12 bottom-0">
            <img
              src={posterUrl || "/placeholder.svg"}
              alt={movieDetails.title}
              className="h-96 rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="px-6 lg:px-12 py-16">
          <h2 className="text-3xl font-bold mb-8">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cast.map((actor: any) => (
              <div key={actor.id} className="text-center">
                {actor.profile_path && (
                  <img
                    src={getImageUrl(actor.profile_path, 'small') || "/placeholder.svg"}
                    alt={actor.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                )}
                <p className="font-semibold text-white">{actor.name}</p>
                <p className="text-sm text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="px-6 lg:px-12 py-16">
          <h2 className="text-3xl font-bold mb-8">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {similarMovies.slice(0, 10).map((movie: any) => (
              <ShowCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
