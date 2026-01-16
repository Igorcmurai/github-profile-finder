export default function ProfileCard({ profile, topRepos }) {
  return (
    <div className="card">
      <div className="profileHeader">
        <img className="avatar" src={profile.avatar_url} alt={profile.login} />

        <div className="profileTitle">
          <h2 className="name">{profile.name || profile.login}</h2>
          <p className="muted">@{profile.login}</p>
        </div>

        <a
          className="btnLink"
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      </div>

      {profile.bio && <p className="bio">{profile.bio}</p>}

      <div className="meta">
        {profile.location && (
          <div className="metaItem">
            <span className="metaLabel">Location</span>
            <span className="metaValue">{profile.location}</span>
          </div>
        )}
      </div>

      <div className="stats">
        <div className="stat">
          <span className="statNumber">{profile.followers}</span>
          <span className="statLabel">Followers</span>
        </div>
        <div className="stat">
          <span className="statNumber">{profile.following}</span>
          <span className="statLabel">Following</span>
        </div>
        <div className="stat">
          <span className="statNumber">{profile.public_repos}</span>
          <span className="statLabel">Public repos</span>
        </div>
      </div>

      {topRepos.length > 0 && (
        <div className="repos">
          <h3 className="reposTitle">Top repositories</h3>
          <div className="repoList">
            {topRepos.map((r) => (
              <a
                key={r.id}
                className="repoItem"
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="repoName">{r.name}</span>
                <span className="repoStars">★ {r.stargazers_count || 0}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
