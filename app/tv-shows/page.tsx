import Header from '@/components/header'
import { getPopularTvShows, getTopRatedTvShows, getTrendingTvShows } from '@/lib/tmdb'
import ContentRow from '@/components/content-row'

export default async function TvShows() {
  const [trending, popular, topRated] = await Promise.all([
    getTrendingTvShows(),
    getPopularTvShows(),
    getTopRatedTvShows(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 px-6 lg:px-12">
        <h1 className="text-5xl font-bold mb-2">TV Shows</h1>
        <p className="text-gray-400 mb-12">Discover the best series and shows</p>
      </div>
      <div className="space-y-8 px-6 lg:px-12 pb-20">
        <ContentRow title="Trending Now" movies={trending} />
        <ContentRow title="Popular Series" movies={popular} />
        <ContentRow title="Top Rated" movies={topRated} />
      </div>
    </main>
  )
}
