import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function HorseCard({ horse }) {
  const { favorites, toggleFavorite } = useFavorites()
  const saved = favorites.includes(horse.id)

  return (
    <article className="horse-card">
      <div className="card-image-wrap">
        <Link to={`/horses/${horse.id}`} aria-label={`View ${horse.name}'s listing`}>
          <img className="card-image" src={horse.image} alt={horse.imageAlt} />
        </Link>
        <span className="status-pill"><span /> Auction open</span>
        <button className={`save-button ${saved ? 'saved' : ''}`} onClick={() => toggleFavorite(horse.id)} aria-label={saved ? `Remove ${horse.name} from saved horses` : `Save ${horse.name}`} aria-pressed={saved}>
          {saved ? '♥' : '♡'}
        </button>
      </div>
      <div className="card-content">
        <div className="card-title-row">
          <div><p className="eyebrow">{horse.breed} · {horse.age} years</p><h3><Link to={`/horses/${horse.id}`}>{horse.name}</Link></h3></div>
          <span className="card-arrow" aria-hidden="true">↗</span>
        </div>
        <p className="horse-location">{horse.location} <span>·</span> {horse.discipline}</p>
        <div className="card-divider" />
        <div className="card-meta"><div><span className="meta-label">Current bid</span><strong>${horse.currentBid.toLocaleString()}</strong></div><div className="bid-count">{horse.bids.length} {horse.bids.length === 1 ? 'bid' : 'bids'}</div></div>
      </div>
    </article>
  )
}
