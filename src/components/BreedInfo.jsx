import { useEffect, useState } from 'react'
import { fetchBreedSummary } from '../services/wikipedia.js'

export default function BreedInfo({ breed }) {
  const [summary, setSummary] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setSummary(null)
    fetchBreedSummary(breed, controller.signal)
      .then((result) => {
        setSummary(result)
        setStatus(result ? 'ready' : 'missing')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error')
      })
    return () => controller.abort()
  }, [breed])

  return (
    <section className="breed-panel" aria-live="polite">
      <div><p className="eyebrow">A little breed background</p><h2>About the {breed}</h2></div>
      {status === 'loading' && <p className="muted">Loading breed information…</p>}
      {status === 'missing' && <p className="muted">No breed summary is available right now.</p>}
      {status === 'error' && <p className="muted">Breed information could not be loaded. Please try again later.</p>}
      {status === 'ready' && (
        <div className="breed-info-content">
          {summary.thumbnail && <img src={summary.thumbnail} alt="" />}
          <div><p>{summary.extract || 'No summary is available for this breed.'}</p>{summary.pageUrl && <a className="text-link" href={summary.pageUrl} target="_blank" rel="noreferrer">Read more on Wikipedia ↗</a>}</div>
        </div>
      )}
      <p className="disclaimer">Background information only. Listing details are provided by the seller and are not independently verified.</p>
    </section>
  )
}
