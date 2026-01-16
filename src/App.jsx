import { useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import StatusMessage from "./components/StatusMessage.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import { fetchGitHubRepos, fetchGitHubUser } from "./services/githubApi.js";

export default function App() {
  const [status, setStatus] = useState(""); // "", "empty", "loading", "notFound", "rateLimit", "forbidden", "error"
  const [profile, setProfile] = useState(null);
  const [topRepos, setTopRepos] = useState([]);
  const [lastUsername, setLastUsername] = useState("");
  const [focusTick, setFocusTick] = useState(0);

  // simple memory cache
  const cache = useMemo(() => new Map(), []);

  function requestFocus() {
    setFocusTick((n) => n + 1);
  }

  function handleEmpty() {
    setStatus("empty");
    requestFocus();
  }

  async function handleSearch(raw) {
    const username = raw.trim();
    if (!username) {
      handleEmpty();
      return;
    }

    // avoid repeating same query if already shown
    if (username.toLowerCase() === lastUsername.toLowerCase() && profile) return;

    setLastUsername(username);

    // cache hit
    const key = username.toLowerCase();
    if (cache.has(key)) {
      const cached = cache.get(key);
      setProfile(cached.profile);
      setTopRepos(cached.topRepos);
      setStatus("");
      return;
    }

    setStatus("loading");
    setProfile(null);
    setTopRepos([]);

    try {
      const user = await fetchGitHubUser(username);
      const repos = await fetchGitHubRepos(username);

      const sortedTop = Array.isArray(repos)
        ? [...repos]
            .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
            .slice(0, 3)
        : [];

      setProfile(user);
      setTopRepos(sortedTop);
      setStatus("");

      cache.set(key, { profile: user, topRepos: sortedTop });
    } catch (err) {
      const code = err?.code || "REQUEST_FAILED";

      if (code === "USER_NOT_FOUND") setStatus("notFound");
      else if (code === "RATE_LIMIT") setStatus("rateLimit");
      else if (code === "FORBIDDEN") setStatus("forbidden");
      else setStatus("error");

      requestFocus();
    }
  }

  function handleClear() {
    setStatus("");
    setProfile(null);
    setTopRepos([]);
    setLastUsername("");
  }

  const isBusy = status === "loading";

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>GitHub Profile Finder</h1>
          <p>Search a GitHub username and view a clean summary.</p>
        </header>

        <main className="main">
          <div className="card">
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClear}
              onEmpty={handleEmpty}
              disabled={isBusy}
              isLoading={isBusy}
              requestFocus={focusTick}
            />
          </div>

          <div className="section">
            <StatusMessage type={status} />

            {profile && <ProfileCard profile={profile} topRepos={topRepos} />}
          </div>
        </main>

        <footer className="footer">
          <p className="muted">Built with React + GitHub API</p>
        </footer>
      </div>
    </div>
  );
}
