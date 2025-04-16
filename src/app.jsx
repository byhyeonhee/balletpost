import { useEffect, useState } from 'react'
import './app.css'

function App() {
  const [posts, setPosts] = useState({})
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    fetch('/posts.json')
      .then(res => res.json())
      .then(setPosts)
      .catch(console.error)
  }, [])

  const toggleExpanded = (site) => {
    setExpanded(prev => ({
      ...prev,
      [site]: !prev[site]
    }))
  }

  return (
    <div className="faq-bg">
      <h1 className="faq-title">Frequently asked questions</h1>
      <div className="faq-list">
        {Object.keys(posts).length === 0 ? (
          <p className="faq-empty">No detected posts.</p>
        ) : (
          Object.keys(posts).map(site => (
            <div key={site} className="faq-group">
              <button
                className="faq-group-btn"
                onClick={() => toggleExpanded(site)}
                aria-expanded={!!expanded[site]}
                aria-controls={`faq-panel-${site}`}
              >
                <span>{site}</span>
                <span className={`faq-arrow ${expanded[site] ? 'open' : ''}`}>▼</span>
              </button>
              <div
                className={`faq-panel ${expanded[site] ? 'open' : ''}`}
                id={`faq-panel-${site}`}
              >
                <ul>
                  {posts[site].map((post, idx) => (
                    <li key={idx} className="faq-item">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="faq-link"
                      >
                        {post.title}
                      </a>
                      <div className="faq-date">
                        Detected: {new Date(post.fetched_at).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="faq-divider" />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App