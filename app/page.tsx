import Header from '@/components/header'
import Hero from '@/components/hero'
import ContentRow from '@/components/content-row'
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/tmdb'

export default async function Home() {
  const [trendingMovies, popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
  ])

  const categories = [
    { title: 'Trending Now', movies: trendingMovies },
    { title: 'Popular', movies: popularMovies },
    { title: 'Top Rated', movies: topRatedMovies },
    { title: 'Coming Soon', movies: upcomingMovies },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero movies={trendingMovies} />
      <div className="space-y-8 pb-20">
        {categories.map((category) => (
          <ContentRow key={category.title} title={category.title} movies={category.movies} />
        ))}
      </div>
    </main>
  )
}
