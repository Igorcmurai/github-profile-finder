# GitHub Profile Finder

A clean and minimal GitHub profile search app. Search by username to view a simple profile summary and the top 3 repositories (sorted by stars).

## Features
- Search GitHub users by username
- Essentials-only profile summary
- Top 3 repositories (stars)
- Clear states: empty input, loading, not found, rate limit, error
- Simple in-memory cache (session)

## Tech
React (Vite) · JavaScript · CSS · GitHub REST API

## Run locally
```bash
git clone <repo-url>
cd githubfinder
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/`).

## Deploy (Vercel)
Preset: **Vite (React)** · Build: `npm run build` · Output: `dist`

## License
MIT
