import { Link } from 'react-router-dom'
import HorseCard from '../components/HorseCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { useAuctions } from '../context/AuctionContext.jsx'

export default function Home() {
  const { horses } = useAuctions()
  return (
    <>
      <section className="hero">
        <img className="hero-image" src="https://images.pexels.com/photos/27740073/pexels-photo-27740073.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="hero-kicker"><span /> A marketplace made for horse people</p>
          <h1>Find your next<br /><em>chapter.</em></h1>
          <p className="hero-copy">Good horses. Thoughtful listings. A better way to find the partner you’ve been looking for.</p>
          <div className="hero-actions"><Link className="button button-light" to="/auctions">Explore the auctions <span>↗</span></Link><Link className="hero-secondary" to="/seller">Have a horse to sell? <span>→</span></Link></div>
        </div>
        <div className="hero-note">HORSES, PEOPLE, AND THE MOMENTS IN BETWEEN</div>
      </section>
      <section className="intro-strip">
        <div className="container intro-inner"><p><span className="intro-mark">✳</span> A more considered way to find your horse.</p><span>Discover · Compare · Connect</span></div>
      </section>
      <section className="container featured-section">
        <SectionHeading eyebrow="The marketplace" title="Good ones, right now." description="Meet a few of the horses waiting for their next person.">
          <Link className="text-link desktop-link" to="/auctions">View all horses <span>↗</span></Link>
        </SectionHeading>
        <div className="horse-grid">{horses.slice(0, 3).map((horse) => <HorseCard key={horse.id} horse={horse} />)}</div>
        <Link className="button button-outline mobile-all-link" to="/auctions">Browse all horses <span>↗</span></Link>
      </section>
      <section className="home-cta">
        <div className="container home-cta-inner"><div><p className="eyebrow">Your next chapter starts here</p><h2>Searching for a horse<br />of your own?</h2></div><Link className="button button-light" to="/auctions">Find your match <span>↗</span></Link></div>
      </section>
    </>
  )
}
