export const handler = async () => {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'GITHUB_TOKEN is not configured. Add it to .env for local dev or the Netlify dashboard for production.',
      }),
    }
  }

  const query = `
    query {
      repositoryOwner(login: "imkhas") {
        ... on User {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                language: primaryLanguage { name }
                stargazerCount
                languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                  nodes {
                    name
                    color
                  }
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const data = await res.json()

    if (data.errors) {
      console.error('GitHub GraphQL errors:', JSON.stringify(data.errors))
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'GitHub rejected the request. Check that GITHUB_TOKEN is valid and can read public repos.',
        }),
      }
    }

    const repos = (data.data?.repositoryOwner?.pinnedItems?.nodes || []).map(
      (repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.url,
        language: repo.language?.name || null,
        languages: (repo.languages?.nodes || []).map((lang) => ({
          name: lang.name,
          color: lang.color,
        })),
        topics: (repo.repositoryTopics?.nodes || []).map((node) => node.topic.name),
        stars: repo.stargazerCount,
      })
    )

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(repos),
    }
  } catch {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Could not reach the GitHub API. Try again in a moment.' }),
    }
  }
}
