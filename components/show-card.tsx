'use client'

import { Play, Plus, ThumbsUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Movie, getImageUrl } from '@/lib/tmdb'

interface ShowCardProps {
  movie: Movie
}

export default function ShowCard({ movie }: ShowCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('flixhub-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  const isFavorited = favorites.includes(movie.id)

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/movie/${movie.id}`)
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = isFavorited
      ? favorites.filter(id => id !== movie.id)
      : [...favorites, movie.id]
    
    setFavorites(updated)
    localStorage.setItem('flixhub-favorites', JSON.stringify(updated))
  }

  const title = movie.title || movie.name || 'Untitled'
  const imageUrl = getImageUrl(movie.poster_path)

  return (
    <div
      className="relative w-52 h-80 rounded-lg overflow-hidden group cursor-pointer"
      onClick={handlePlayClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content Overlay */}
      <div className={`absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="font-bold text-lg mb-2 text-balance line-clamp-2">{title}</h3>
        
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="text-accent font-bold">{(movie.vote_average || 0).toFixed(1)}</span>
          <span className="text-accent">★</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handlePlayClick}
            className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background rounded px-3 py-2 font-semibold hover:bg-foreground/80 transition-all duration-200 active:scale-95"
          >
            <Play size={16} fill="currentColor" />
            <span>Play</span>
          </button>
          <button 
            onClick={toggleFavorite}
            className={`p-2 rounded transition-all duration-200 ${
              isFavorited 
                ? 'bg-accent text-background border-accent' 
                : 'bg-card border border-border hover:border-accent'
            }`}
            title={isFavorited ? 'Remove from list' : 'Add to list'}
          >
            <Plus size={16} />
          </button>
          <button className="p-2 bg-card border border-border rounded hover:border-accent transition-all duration-200 hover:bg-accent/10">
            <ThumbsUp size={16} />
          </button>
        </div>
      </div>

      {/* Badge - Show "Added" instead of "HD" when movie is in favorites */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isFavorited ? (
          <div className="bg-accent text-background text-xs font-bold px-2 py-1 rounded">Added</div>
        ) : (
          <div className="bg-accent text-background text-xs font-bold px-2 py-1 rounded">HD</div>
        )}
      </div>
    </div>
  )
}
