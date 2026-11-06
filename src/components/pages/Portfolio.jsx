import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ProjectModal from '../ProjectModal'

const ALIAS = {
  'c++': 'cplusplus',
  cpp: 'cplusplus',
  'c#': 'csharp',
  cs: 'csharp',
  html: 'html5',
  css: 'css3',
  'node.js': 'nodedotjs',
  nodejs: 'nodedotjs',
  node: 'nodedotjs',
  'next.js': 'nextdotjs',
  nextjs: 'nextdotjs',
  'tailwind css': 'tailwindcss',
  tailwind: 'tailwindcss',
  'raspberry pi': 'raspberrypi',
  'jupyter notebook': 'jupyter',
  'scikit-learn': 'scikitlearn',
  sklearn: 'scikitlearn',
  'opencv-python': 'opencv',
  tflite: 'tensorflow',
  'tensorflow lite': 'tensorflow',
  onnxruntime: 'onnx',
  'onnx runtime': 'onnx',
}

const TECH_NAMES = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  html5: 'HTML',
  css3: 'CSS',
  cplusplus: 'C++',
  csharp: 'C#',
  c: 'C',
  java: 'Java',
  kotlin: 'Kotlin',
  php: 'PHP',
  react: 'React',
  nextdotjs: 'Next.js',
  tailwindcss: 'Tailwind CSS',
  tensorflow: 'TensorFlow',
  pytorch: 'PyTorch',
  opencv: 'OpenCV',
  jupyter: 'Jupyter',
  numpy: 'NumPy',
  pandas: 'Pandas',
  scikitlearn: 'scikit-learn',
  mysql: 'MySQL',
  mongodb: 'MongoDB',
  firebase: 'Firebase',
  nodedotjs: 'Node.js',
  express: 'Express',
  flask: 'Flask',
  django: 'Django',
  docker: 'Docker',
  git: 'Git',
  linux: 'Linux',
  raspberrypi: 'Raspberry Pi',
  android: 'Android',
  onnx: 'ONNX',
  tensorrt: 'TensorRT',
  sql: 'SQL',
}

const normalizeTech = (name) => {
  const key = String(name).toLowerCase().trim()
  return ALIAS[key] || key.replace(/[^a-z0-9]/g, '')
}

const withTech = (repo) => {
  const languages = Array.isArray(repo.languages) && repo.languages.length
    ? repo.languages.map((l) => l.name)
    : repo.language ? [repo.language] : []
  const topics = Array.isArray(repo.topics) ? repo.topics : []
  const keys = new Set()
  languages.forEach((l) => keys.add(normalizeTech(l)))
  topics.forEach((t) => {
    const key = normalizeTech(t)
    if (TECH_NAMES[key]) keys.add(key)
  })
  return { ...repo, techKeys: [...keys] }
}

const TechLogo = ({ slug, name }) => {
  const [failed, setFailed] = useState(false)
  if (failed) return <i className="tech-fallback" aria-hidden="true">{name.charAt(0)}</i>
  return (
    <img
      className="tech-logo"
      src={`https://cdn.simpleicons.org/${slug}`}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

const Portfolio = () => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('/.netlify/functions/getPinnedRepos')
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          throw new Error(data?.error || `HTTP error: ${res.status}`)
        }
        if (Array.isArray(data)) {
          setRepos(data.map(withTech))
        } else {
          throw new Error(data?.error || 'Unexpected response format')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  const techOptions = useMemo(() => {
    const counts = new Map()
    repos.forEach((repo) => repo.techKeys.forEach((key) => counts.set(key, (counts.get(key) || 0) + 1)))
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || (TECH_NAMES[a[0]] || a[0]).localeCompare(TECH_NAMES[b[0]] || b[0]))
      .map(([key]) => ({ key, name: TECH_NAMES[key] || key }))
  }, [repos])

  const toggleFilter = (key) => {
    setFilters((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key])
  }

  const closeModal = useCallback(() => setSelected(null), [])

  const visible = filters.length
    ? repos.filter((repo) => repo.techKeys.some((key) => filters.includes(key)))
    : repos

  if (loading) {
    return (
      <div>
        <p className="section-title">My Projects</p>
        <p className="project-note">Loading projects...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p className="section-title">My Projects</p>
        <p className="project-note">Could not load projects: {error}</p>
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div>
        <p className="section-title">My Projects</p>
        <p className="project-note">
          No pinned repositories found. Pin some repos on GitHub or add a{' '}
          <code>GITHUB_TOKEN</code> environment variable in Netlify.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="section-title">My Projects</p>

      <div className="tech-filters" role="group" aria-label="Filter projects by technology">
        <button
          className={`tech-chip${filters.length === 0 ? ' active' : ''}`}
          onClick={() => setFilters([])}
          aria-pressed={filters.length === 0}
        >
          All
        </button>
        {techOptions.map((tech) => (
          <button
            key={tech.key}
            className={`tech-chip${filters.includes(tech.key) ? ' active' : ''}`}
            onClick={() => toggleFilter(tech.key)}
            aria-pressed={filters.includes(tech.key)}
            title={tech.name}
            aria-label={tech.name}
          >
            <TechLogo slug={tech.key} name={tech.name} />
            <span>{tech.name}</span>
          </button>
        ))}
      </div>

      <div className="projects-grid" data-stagger>
        {visible.map((repo) => (
          <article
            key={repo.name}
            className="project-card"
            onClick={() => setSelected(repo)}
          >
            <div className="card-banner">
              {repo.name.charAt(0).toUpperCase()}
            </div>
            <div className="card-body">
              <h3>{repo.name.replace(/[-_]/g, ' ')}</h3>
              <p>
                {repo.description
                  ? repo.description.length > 80
                    ? repo.description.slice(0, 80) + '...'
                    : repo.description
                  : 'No description'}
              </p>
              <div className="card-tags">
                {repo.techKeys.slice(0, 3).map((key) => (
                  <span key={key}>{TECH_NAMES[key] || key}</span>
                ))}
                {repo.stars > 0 && <span>&#9733; {repo.stars}</span>}
              </div>
              <div className="card-actions">
                <button type="button" className="card-link">
                  Quick look <ion-icon name="expand-outline"></ion-icon>
                </button>
                <a
                  className="card-github"
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ion-icon name="logo-github"></ion-icon> Code
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="project-note">No projects match those technologies. Try clearing a filter.</p>
      )}

      <div className="github-contribution">
        <img
          src="https://ghchart.rshah.org/imkhas"
          alt="GitHub Contribution Chart"
        />
      </div>

      {selected && <ProjectModal repo={selected} onClose={closeModal} />}
    </div>
  )
}

export default Portfolio
