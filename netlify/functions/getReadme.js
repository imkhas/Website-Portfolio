const OWNER = 'imkhas'
const REPO = /^[A-Za-z0-9._-]+$/

export const handler = async (event) => {
  const repo = event.queryStringParameters?.repo || ''

  if (!REPO.test(repo)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid repository name.' }),
    }
  }

  const token = process.env.GITHUB_TOKEN
  const headers = {
    Accept: 'application/vnd.github.raw',
    'User-Agent': 'portfolio-readme',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/readme`, { headers })

    if (res.status === 404) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'This repository has no README yet.' }),
      }
    }

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Could not load the README right now.' }),
      }
    }

    const markdown = await res.text()

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markdown }),
    }
  } catch {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Could not load the README right now.' }),
    }
  }
}
