import { Link } from 'react-router-dom'
import HorseCard from '../components/HorseCard.jsx'
import { useAuctions } from '../context/AuctionContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function BuyerAccount() {
  const { horses } = useAuctions()
  const { favorites } = useFavorites()
  const savedHorses = horses.filter((horse) => favorites.includes(horse.id))

  return (
    <section className="container page-section">
      <div className="page-banner account-banner"><div><p className="eyebrow">Your corner of the barn</p><h1>Saved for later.</h1><p>Keep the horses you’re thinking about close at hand.</p></div><span className="banner-ornament" aria-hidden="true">♡</span></div>
      <div className="account-heading"><div><p className="eyebrow">Your shortlist</p><h2>Saved horses <span>{savedHorses.length}</span></h2></div></div>
      {savedHorses.length ? <div className="horse-grid">{savedHorses.map((horse) => <HorseCard key={horse.id} horse={horse} />)}</div> : <div className="empty-state"><span>♡</span><h2>Your shortlist starts here.</h2><p>Save a horse that catches your eye and it’ll be waiting for you here.</p><Link className="button button-dark" to="/auctions">Browse horses <span>↗</span></Link></div>}
      <p className="demo-notice account-note">Favorites are stored in memory for this session. This demo does not use accounts or authentication.</p>
    </section>
  )
}
