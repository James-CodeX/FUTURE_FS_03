'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ShowCard from './show-card'
import { Movie } from '@/lib/tmdb'

interface ContentRowProps {
  title: string
  movies: Movie[]
}

export default function ContentRow({ title, movies }: ContentRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="px-6 lg:px-12 space-y-4 group">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-background to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-accent"
          aria-label="Scroll left"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth-snap pb-2"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-item flex-shrink-0">
              <ShowCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-gradient-to-l from-background to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-accent"
          aria-label="Scroll right"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  )
}
