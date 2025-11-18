'use client'

import { useState, useEffect } from 'react'
import { Menu, Search, Bell, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { searchMovies } from '@/lib/tmdb'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true)
        const results = await searchMovies(searchQuery)
        setSearchResults(results.slice(0, 5))
        setIsSearching(false)
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(delaySearch)
  }, [searchQuery])

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`)
    setSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const isActive = (path: string) => pathname === path

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'TV Shows', path: '/tv-shows' },
    { label: 'Movies', path: '/movies' },
    { label: 'Browse All', path: '/browse' },
    { label: 'My List', path: '/my-list' },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-background via-background/50 to-transparent'}`}>
      <div className="px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="text-3xl font-display tracking-tight hover:opacity-80 transition-opacity duration-200">
            <span className="text-accent">Flix</span><span className="text-foreground">Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path) ? 'text-accent' : 'hover:text-accent'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-background border border-border rounded-sm px-3 py-1.5 w-64 md:w-80">
                <Search size={16} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
                <button onClick={handleSearchClick} className="text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button onClick={handleSearchClick} className="p-2 hover:text-accent transition-colors duration-200">
                <Search size={20} />
              </button>
            )}
            
            {/* Search Results Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 right-0 w-64 md:w-80 bg-background border border-border rounded-md shadow-2xl overflow-hidden z-50">
                {searchResults.map((movie) => (
                  <button
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-accent/10 transition-colors text-left"
                  >
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : '/placeholder.svg'}
                      alt={movie.title || movie.name}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {movie.title || movie.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || 'N/A'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* No Results Message */}
            {searchOpen && searchQuery.trim().length > 2 && searchResults.length === 0 && !isSearching && (
              <div className="absolute top-full mt-2 right-0 w-64 md:w-80 bg-background border border-border rounded-md shadow-2xl p-4 text-center text-sm text-muted-foreground">
                No movies found
              </div>
            )}
          </div>

          <button className="p-2 hover:text-accent transition-colors duration-200">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-card rounded-full transition-colors duration-200">
            <User size={20} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden hover:text-accent transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block text-sm font-medium transition-colors duration-200 ${
                isActive(item.path) ? 'text-accent' : 'hover:text-accent'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
