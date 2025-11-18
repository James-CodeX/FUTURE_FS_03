# FlixHub - Netflix Rebrand Project

A modern recreation of Netflix's streaming platform built with Next.js 16, featuring AI-enhanced branding and a sleek, responsive design.

## 🎯 Project Overview

This project is a complete rebrand and redesign of Netflix's website, created as part of the **Future Interns Full Stack Web Development Task 3**. The goal was to leverage AI tools and modern web technologies to create a fresh, user-friendly streaming platform interface.

## ✨ Features Achieved

### 🎨 AI-Enhanced Branding

- **Authentic Netflix Color Scheme**: Implemented the iconic Netflix red (`#E50914`) as the primary accent color throughout the application
- **Netflix-Style Typography**:
  - **Bebas Neue** for display text and logo (matching Netflix's bold branding)
  - **Inter** for body text (clean, modern sans-serif)
- **Dark Theme Design**: Netflix-inspired dark theme with rich blacks and strategic red accents

### 💻 Frontend Development

- **Framework**: Next.js 16 (with Turbopack for faster builds)
- **Styling**: Tailwind CSS 4 with custom Netflix-inspired design system
- **Responsive Design**: Fully mobile-optimized layout
- **Components Built**:
  - Dynamic header with smooth scroll effects
  - Hero section with featured content
  - Content rows with horizontal scrolling
  - Movie/TV show cards with hover effects
  - Browse and search functionality

### 🎬 TMDB Integration

- **Real Movie Data**: Integrated with The Movie Database (TMDB) API
- **Dynamic Content Categories**:
  - Trending Movies
  - Popular Movies
  - Top Rated Movies
  - Upcoming Movies
  - TV Shows (Popular, Top Rated, Trending)
- **Movie Details**: Individual movie pages with cast, ratings, and similar recommendations
- **Search Functionality**: Real-time movie search capabilities

### 🔧 Technical Implementation

- **Server Components**: Leveraged Next.js 16 server components for optimal performance
- **API Routes**: Custom API endpoints for TMDB data fetching
- **TypeScript**: Full type safety throughout the application
- **Modern CSS**: OKLCH color space for better color accuracy
- **Animations**: Smooth transitions and hover effects for Netflix-like UX

### 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes (mobile, tablet, desktop)
- Touch-friendly navigation on mobile devices
- Adaptive layouts for different viewports

### 🚀 Performance Optimization

- Server-side rendering for faster initial page loads
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Efficient data caching with revalidation strategies

## 🛠️ Tech Stack

| Category       | Technology                       |
| -------------- | -------------------------------- |
| **Framework**  | Next.js 16 (React 18)            |
| **Styling**    | Tailwind CSS 4                   |
| **Language**   | TypeScript                       |
| **API**        | TMDB (The Movie Database)        |
| **Fonts**      | Bebas Neue, Inter (Google Fonts) |
| **Icons**      | Lucide React                     |
| **Deployment** | Netlify                          |

## 📋 Prerequisites

- Node.js 18+ installed
- TMDB API Key (free from [themoviedb.org](https://www.themoviedb.org/))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd b_dONMNO1XueP
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── api/tmdb/          # TMDB API routes
│   ├── movie/[id]/        # Dynamic movie pages
│   ├── globals.css        # Global styles & theme
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Home page
├── components/
│   ├── header.tsx         # Navigation header
│   ├── hero.tsx           # Hero section
│   ├── content-row.tsx    # Movie carousels
│   ├── show-card.tsx      # Movie/TV cards
│   └── ui/                # Reusable UI components
├── lib/
│   ├── tmdb.ts           # TMDB API client
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎨 Design System

### Color Palette

- **Background**: Deep black (`oklch(0.145 0 0)`)
- **Foreground**: Off-white (`oklch(0.985 0 0)`)
- **Accent (Netflix Red)**: `oklch(0.532 0.233 29.23)` / `#E50914`
- **Muted**: Dark gray (`oklch(0.269 0 0)`)

### Typography

- **Display/Logo**: Bebas Neue (400)
- **Body**: Inter (variable weights)

## 🌟 Key Features Implemented

### ✅ Homepage

- Featured movie hero section
- Multiple content carousels (Trending, Popular, Top Rated, Upcoming)
- Smooth scroll effects
- Dynamic content loading

### ✅ Navigation

- Sticky header with scroll effects
- Active page indicators
- Mobile-responsive menu
- Search, notifications, and profile icons

### ✅ Browse Pages

- Dedicated Movies page
- Dedicated TV Shows page
- Genre-based filtering
- My List functionality (local storage)

### ✅ Movie Details

- Full movie information
- Cast and crew
- Similar movie recommendations
- Ratings and release dates

## 🚀 Deployment to Netlify

### Build Configuration

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Environment Variables

Add your `NEXT_PUBLIC_TMDB_API_KEY` in Netlify's environment variables section.

## 📊 What Was Achieved vs. Task Requirements

| Requirement                      | Status | Implementation                                         |
| -------------------------------- | ------ | ------------------------------------------------------ |
| Choose a brand to redesign       | ✅     | Netflix                                                |
| AI-generated branding            | ✅     | Used Netflix's authentic branding (colors, typography) |
| Responsive frontend with Next.js | ✅     | Next.js 16 with full responsive design                 |
| Tailwind CSS styling             | ✅     | Tailwind CSS 4 with custom theme                       |
| Backend integration              | 🔄     | TMDB API (external service)                            |
| SEO optimization                 | ✅     | Next.js metadata, semantic HTML                        |
| Mobile optimization              | ✅     | Mobile-first responsive design                         |
| Deployment                       | ✅     | Ready for Netlify deployment                           |

### Notes on Backend

- Instead of Strapi/Firebase, this project uses TMDB API for real movie data
- All content is dynamically fetched and cached
- Local storage used for user preferences (favorites)

## 🎓 Skills Demonstrated

- Modern React development with Next.js 16
- TypeScript for type-safe development
- Tailwind CSS for rapid UI development
- API integration and data fetching
- Responsive design principles
- Performance optimization techniques
- Component-based architecture
- State management
- Modern CSS (OKLCH color space)
- Deployment best practices

## 📝 Future Enhancements

- [ ] User authentication (Firebase/Auth0)
- [ ] Backend CMS integration (Strapi)
- [ ] Video player integration
- [ ] Advanced search filters
- [ ] User reviews and ratings
- [ ] Watchlist synchronization
- [ ] Progressive Web App (PWA) features

## 📄 License

This is a learning project created for educational purposes.

## 🙏 Acknowledgments

- **TMDB** for providing the movie database API
- **Netflix** for design inspiration
- **Future Interns** for the project opportunity
- **Vercel** for Next.js framework

---

**Built with ❤️ by James Karanja | Future Interns Full Stack Development Task 3**
