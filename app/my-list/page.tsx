'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import ShowCard from '@/components/show-card'

export default function MyList() {
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('flixhub-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 px-6 lg:px-12">
        <h1 className="text-5xl font-bold mb-2">My List</h1>
        <p className="text-gray-400 mb-12">Your saved movies and shows</p>
      </div>
      {favorites.length === 0 ? (
        <div className="px-6 lg:px-12 py-20 text-center">
          <p className="text-xl text-gray-400">No items in your list yet. Start adding your favorites!</p>
        </div>
      ) : (
        <div className="px-6 lg:px-12 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {favorites.map((movie) => (
              <ShowCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
