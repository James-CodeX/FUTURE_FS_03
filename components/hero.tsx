'use client'

import { Play, Info } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getImageUrl } from '@/lib/tmdb'

interface Movie {
  id: number
  title?: string
  name?: string
  backdrop_path: string
  overview: string
  vote_average: number
}

interface HeroProps {
  movies: Movie[]
}

export default function Hero({ movies }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prev) => (prev + 1) % (movies.length || 1))
    }, 8000)
    return () => clearInterval(interval)
  }, [movies.length])

  const featuredMovie = movies[currentMovieIndex] || movies[0]
  if (!featuredMovie) {
    return null
  }

  const title = featuredMovie.title || featuredMovie.name || 'Featured Content'
  const imageUrl = getImageUrl(featuredMovie.backdrop_path, 'large')

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden pt-16">
      {/* Background Image with smooth transition */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className={`relative h-full flex items-center px-6 lg:px-12 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-balance">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg line-clamp-3">
              {featuredMovie.overview || 'Stream now on FlixHub with ad-free entertainment.'}
            </p>
          </div>

          {/* Rating and Info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full">
              <span className="text-accent font-bold">{(featuredMovie.vote_average || 0).toFixed(1)}</span>
              <span className="text-accent">★</span>
            </div>
            <span className="text-muted-foreground">Now Streaming</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">4K UHD</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => router.push(`/movie/${featuredMovie.id}`)}
              className="group flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-lg font-bold hover:bg-foreground/80 transition-all duration-300 hover:scale-105"
            >
              <Play size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <span>Play</span>
            </button>
            <button 
              onClick={() => router.push(`/movie/${featuredMovie.id}`)}
              className="group flex items-center gap-2 bg-card border border-border text-foreground px-8 py-3 rounded-lg font-bold hover:bg-card/80 hover:border-accent transition-all duration-300 hover:scale-105"
            >
              <Info size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Movie Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {movies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMovieIndex(index)}
            className={`h-1 transition-all duration-300 rounded-full ${
              index === currentMovieIndex ? 'bg-accent w-8' : 'bg-accent/40 w-2 hover:bg-accent/60'
            }`}
            aria-label={`Go to movie ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
