import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { pauseScroll, resumeScroll } from '../smoothScroll'

const cache = new Map()

const ownUrl = (repo) => (url, key) => {
  if (/^(https?:|mailto:|tel:|#|data:|blob:)/i.test(url)) return url
  const clean = url.replace(/^\.?\//, '')
  const base = `https://raw.githubusercontent.com/imkhas/${repo}/HEAD/${clean}`
  return key === 'src' ? base : base.replace('raw.githubusercontent.com', 'github.com').replace('/HEAD/', '/blob/HEAD/')
}

export default function ProjectModal({ repo, onClose }) {
  const [markdown, setMarkdown] = useState(cache.get(repo.name) || '')
  const [loading, setLoading] = useState(!cache.has(repo.name))
  const [error, setError] = useState('')
  const closeRef = useRef(null)
  const previousFocus = useRef(null)

  useEffect(() => {
    let cancelled = false
    if (cache.has(repo.name)) return
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`/.netlify/functions/getReadme?repo=${encodeURIComponent(repo.name)}`)
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || 'Could not load the README right now.')
        const text = data.markdown || ''
        cache.set(repo.name, text)
        if (!cancelled) setMarkdown(text)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [repo.name])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    previousFocus.current = document.activeElement
    document.addEventListener('keydown', onKey)
    pauseScroll()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (closeRef.current) closeRef.current.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
      resumeScroll()
      if (previousFocus.current instanceof HTMLElement) previousFocus.current.focus()
    }
  }, [onClose])

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay" onMouseDown={onBackdrop} role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-label={`${repo.name} overview`}>
        <div className="modal-head">
          <div>
            <span className="modal-eyebrow">Project overview</span>
            <h3>{repo.name.replace(/[-_]/g, ' ')}</h3>
          </div>
          <div className="modal-actions">
            <a className="modal-github" href={repo.url} target="_blank" rel="noopener noreferrer">
              GitHub <ion-icon name="open-outline"></ion-icon>
            </a>
            <button className="modal-close" ref={closeRef} onClick={onClose} aria-label="Close overview">×</button>
          </div>
        </div>

        <div className="modal-body" data-lenis-prevent>
          {loading && <p className="modal-note">Loading README…</p>}

          {!loading && error && (
            <div className="modal-error">
              <p>{error}</p>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">Open on GitHub <ion-icon name="open-outline"></ion-icon></a>
            </div>
          )}

          {!loading && !error && markdown && (
            <div className="readme">
              <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={ownUrl(repo.name)}>
                {markdown}
              </ReactMarkdown>
            </div>
          )}

          {!loading && !error && !markdown && <p className="modal-note">This project has no README content yet.</p>}
        </div>
      </div>
    </div>
  )
}
