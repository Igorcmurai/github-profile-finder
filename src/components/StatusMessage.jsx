export default function StatusMessage({ type }) {
  if (!type) return null;

  const map = {
    empty: {
      title: "Type a username",
      text: "Enter a GitHub username and press Search.",
      tone: "info",
      live: "polite",
    },
    loading: {
      title: "Loading...",
      text: "Fetching GitHub profile data.",
      tone: "info",
      live: "polite",
      spinner: true,
    },
    notFound: {
      title: "User not found",
      text: "This username doesn’t exist on GitHub. Try another one.",
      tone: "danger",
      live: "assertive",
    },
    rateLimit: {
      title: "GitHub API rate limit reached",
      text: "Try again later. Searches are cached in this session.",
      tone: "warning",
      live: "assertive",
    },
    forbidden: {
      title: "Request blocked (403)",
      text: "GitHub denied the request. Try again later.",
      tone: "warning",
      live: "assertive",
    },
    error: {
      title: "Something went wrong",
      text: "Please try again.",
      tone: "danger",
      live: "assertive",
    },
  };

  const content = map[type] || map.error;

  return (
    <div
      className={`status card tone-${content.tone || "info"}`}
      role="status"
      aria-live={content.live || "polite"}
      aria-atomic="true"
    >
      <div className="statusTop">
        <h2 className="statusTitle">{content.title}</h2>
        {content.spinner ? <span className="spinner" aria-hidden="true" /> : null}
      </div>
      <p className="muted">{content.text}</p>
    </div>
  );
}
