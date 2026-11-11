import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BreedInfo from '../components/BreedInfo.jsx'
import { useAuctions } from '../context/AuctionContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import NotFound from './NotFound.jsx'

export default function HorseDetails() {
  const { horseId } = useParams()
  const { horses, placeBid } = useAuctions()
  const { favorites, toggleFavorite } = useFavorites()
  const [bidValue, setBidValue] = useState('')
  const [message, setMessage] = useState('')
  const horse = horses.find((item) => item.id === horseId)
  if (!horse) return <NotFound />

  function submitBid(event) {
    event.preventDefault()
    const amount = Number(bidValue)
    if (!Number.isInteger(amount) || amount < horse.currentBid + 100 || (amount - horse.currentBid) % 100 !== 0) {
      setMessage(`Enter a bid in $100 increments, starting at $${(horse.currentBid + 100).toLocaleString()}.`)
      return
    }
    placeBid(horse.id, 'You', amount)
    setBidValue('')
    setMessage('Your bid has been added. Good luck!')
  }

  return (
    <section className="container detail-section">
      <Link to="/auctions" className="back-link">← Back to all horses</Link>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-photo-wrap"><img className="detail-photo" src={horse.image} alt={horse.imageAlt} /><span className="status-pill"><span /> Auction open</span></div>
          <div className="detail-heading"><div><p className="eyebrow">{horse.breed} · {horse.age} years · {horse.location}</p><h1>{horse.name}</h1></div><button className={`button button-outline favorite-action ${favorites.includes(horse.id) ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(horse.id)} aria-pressed={favorites.includes(horse.id)}>{favorites.includes(horse.id) ? '♥ Saved' : '♡ Save horse'}</button></div>
          <p className="detail-description">{horse.description}</p>
          <div className="facts-grid"><div><span>Breed</span><strong>{horse.breed}</strong></div><div><span>Age</span><strong>{horse.age} years</strong></div><div><span>Discipline</span><strong>{horse.discipline}</strong></div><div><span>Location</span><strong>{horse.location}</strong></div><div><span>Listed by</span><strong>{horse.seller}</strong></div><div><span>Auction ends</span><strong>{new Date(horse.endsAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</strong></div></div>
          <BreedInfo breed={horse.breed} />
          <section className="bid-history"><p className="eyebrow">The activity</p><h2>Bid history <span>({horse.bids.length})</span></h2>{horse.bids.length ? <ul>{horse.bids.map((bid, index) => <li key={`${bid.name}-${bid.time}-${index}`}><span className="bid-avatar">{bid.name.charAt(0)}</span><span className="bid-person">{bid.name}<small>{bid.time}</small></span><strong>${bid.amount.toLocaleString()}</strong></li>)}</ul> : <p className="muted">No bids yet. You could be the first.</p>}</section>
        </div>
        <aside className="bid-card">
          <p className="eyebrow">Current bid</p><div className="current-bid">${horse.currentBid.toLocaleString()}</div><p className="muted">{horse.bids.length} {horse.bids.length === 1 ? 'bid' : 'bids'} · Starting at ${horse.startingBid.toLocaleString()}</p>
          <div className="bid-card-rule" />
          <form onSubmit={submitBid}><label htmlFor="bid-amount">Your bid <span>USD</span></label><div className="bid-input-wrap"><span>$</span><input id="bid-amount" type="number" min={horse.currentBid + 100} step="100" placeholder={(horse.currentBid + 100).toString()} value={bidValue} onChange={(event) => setBidValue(event.target.value)} required /></div><button className="button button-dark bid-submit" type="submit">Place a bid <span>↗</span></button></form>
          <p className="bid-feedback" role="status">{message}</p><p className="demo-notice">Demo only: bids are simulated and do not create a real offer.</p>
        </aside>
      </div>
    </section>
  )
}
