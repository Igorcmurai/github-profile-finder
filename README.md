# GitHub Profile Finder

A clean and minimal GitHub profile search app. Search by username to view a simple profile summary and the top 3 repositories (sorted by stars).

**Live:** https://igorcmurai-github-profile-finder.vercel.app/

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
git clone https://github.com/Igorcmurai/github-profile-finder.git
cd github-profile-finder
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/`).

## Deploy (Vercel)
Preset: **Vite (React)** · Build: `npm run build` · Output: `dist`

## License
MIT
