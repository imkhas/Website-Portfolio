export const handler = async () => {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
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
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([]),
      }
    }

    const repos = (data.data?.repositoryOwner?.pinnedItems?.nodes || []).map(
      (repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.url,
        language: repo.language?.name || null,
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
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
    }
  }
}
