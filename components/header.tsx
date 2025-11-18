'use client'

import { useState, useEffect } from 'react'
import { Menu, Search, Bell, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <button className="p-2 hover:text-accent transition-colors duration-200">
            <Search size={20} />
          </button>
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
