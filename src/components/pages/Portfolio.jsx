import React, { useState, useEffect } from 'react'

const Portfolio = () => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('/.netlify/functions/getPinnedRepos')
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        const data = await res.json()
        if (Array.isArray(data)) {
          setRepos(data)
        } else {
          throw new Error('Unexpected response format')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  if (loading) {
    return (
      <div>
        <p className="section-title">My Projects</p>
        <p style={{ color: '#888', fontSize: 14 }}>Loading projects...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p className="section-title">My Projects</p>
        <p style={{ color: '#888', fontSize: 14 }}>Could not load projects: {error}</p>
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div>
        <p className="section-title">My Projects</p>
        <p style={{ color: '#888', fontSize: 14 }}>
          No pinned repositories found. Pin some repos on GitHub or add a{' '}
          <code>GITHUB_TOKEN</code> environment variable in Netlify.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="section-title">My Projects</p>

      <div className="github-streak">
        <img
          src="https://github-readme-streak-stats.herokuapp.com/?user=imkhas&theme=dark&hide_border=true"
          alt="GitHub Streak"
        />
      </div>

      <div className="projects-grid">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
          >
            <div className="card-banner">
              {repo.name.charAt(0).toUpperCase()}
            </div>
            <div className="card-body">
              <h3>{repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
              <p>
                {repo.description
                  ? repo.description.length > 80
                    ? repo.description.slice(0, 80) + '...'
                    : repo.description
                  : 'No description'}
              </p>
              <div className="card-tags">
                {repo.language && <span>{repo.language}</span>}
                {repo.stars > 0 && <span>&#9733; {repo.stars}</span>}
              </div>
              <span className="card-link">
                View on GitHub <ion-icon name="arrow-forward-outline"></ion-icon>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Portfolio