const BASE_URL = "https://api.github.com";

async function parseError(res) {
  let data = null;
  try {
    data = await res.json();
  } catch {
    // ignore
  }

  // GitHub costuma retornar message em casos de erro
  const message = data?.message || "";

  const err = new Error("REQUEST_FAILED");
  err.code = "REQUEST_FAILED";
  err.status = res.status;
  err.message = message;

  // 404 user not found
  if (res.status === 404) {
    err.code = "USER_NOT_FOUND";
    return err;
  }

  // rate limit / forbidden (403) pode ser rate limit ou bloqueio
  if (res.status === 403) {
    // se tiver mensagem mencionando rate limit, tratamos como rate limit
    if (message.toLowerCase().includes("rate limit")) {
      err.code = "RATE_LIMIT";
      return err;
    }
    // fallback: 403 genérico
    err.code = "FORBIDDEN";
    return err;
  }

  return err;
}

export async function fetchGitHubUser(username) {
  const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`);

  if (!res.ok) throw await parseError(res);
  return res.json();
}

export async function fetchGitHubRepos(username) {
  const res = await fetch(
    `${BASE_URL}/users/${encodeURIComponent(username)}/repos?per_page=100`
  );

  if (!res.ok) throw await parseError(res);
  return res.json();
}
