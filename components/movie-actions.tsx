'use client'

import { Play, Plus, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Movie } from '@/lib/tmdb'

interface MovieActionsProps {
  movie: Movie
}

export default function MovieActions({ movie }: MovieActionsProps) {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('flixhub-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  const isFavorited = favorites.some(fav => fav.id === movie.id)

  const toggleFavorite = () => {
    const updated = isFavorited
      ? favorites.filter(fav => fav.id !== movie.id)
      : [...favorites, movie]
    
    setFavorites(updated)
    localStorage.setItem('flixhub-favorites', JSON.stringify(updated))
  }

  if (!mounted) {
    return (
      <div className="flex gap-4 flex-wrap">
        <button className="flex items-center gap-2 bg-accent text-background px-8 py-3 rounded font-bold text-lg hover:bg-accent/80 transition-all duration-200 active:scale-95">
          <Play size={24} fill="currentColor" />
          Play
        </button>
        <button className="px-8 py-3 border-2 border-gray-500 text-white rounded font-bold hover:border-white transition-colors">
          Add to List
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-4 flex-wrap">
      <button className="flex items-center gap-2 bg-accent text-background px-8 py-3 rounded font-bold text-lg hover:bg-accent/80 transition-all duration-200 active:scale-95">
        <Play size={24} fill="currentColor" />
        Play
      </button>
      <button 
        onClick={toggleFavorite}
        className={`flex items-center gap-2 px-8 py-3 border-2 rounded font-bold transition-all duration-200 ${
          isFavorited 
            ? 'bg-accent border-accent text-background' 
            : 'border-gray-500 text-white hover:border-white'
        }`}
      >
        {isFavorited ? <Check size={20} /> : <Plus size={20} />}
        {isFavorited ? 'In My List' : 'Add to List'}
      </button>
    </div>
  )
}
