import Header from '@/components/header'
import { getMoviesByGenre, GENRES } from '@/lib/tmdb'
import ContentRow from '@/components/content-row'

export default async function Browse() {
  const genreIds = [28, 35, 18, 27, 878, 12, 53, 16] // Action, Comedy, Drama, Horror, Sci-Fi, Adventure, Thriller, Animation

  const genreResults = await Promise.all(
    genreIds.map(id => getMoviesByGenre(id))
  )

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 px-6 lg:px-12">
        <h1 className="text-5xl font-bold mb-2">Browse All</h1>
        <p className="text-gray-400 mb-12">Explore content by genre</p>
      </div>
      <div className="space-y-8 px-6 lg:px-12 pb-20">
        {genreIds.map((genreId, index) => (
          <ContentRow
            key={genreId}
            title={GENRES[genreId as keyof typeof GENRES] || 'More'}
            movies={genreResults[index]}
          />
        ))}
      </div>
    </main>
  )
}
