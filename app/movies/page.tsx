import Header from '@/components/header'
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/tmdb'
import ContentRow from '@/components/content-row'

export default async function Movies() {
  const [popular, topRated, upcoming] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 px-6 lg:px-12">
        <h1 className="text-5xl font-bold mb-2">Movies</h1>
        <p className="text-gray-400 mb-12">Explore thousands of movies</p>
      </div>
      <div className="space-y-8 px-6 lg:px-12 pb-20">
        <ContentRow title="Popular Now" movies={popular} />
        <ContentRow title="Top Rated" movies={topRated} />
        <ContentRow title="Coming Soon" movies={upcoming} />
      </div>
    </main>
  )
}
