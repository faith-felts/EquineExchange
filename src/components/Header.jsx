import { NavLink } from 'react-router-dom'

const links = [
  { to: '/auctions', label: 'Browse horses' },
  { to: '/seller', label: 'Sell a horse' },
  { to: '/account', label: 'My saved horses' },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/" aria-label="Equine Exchange home">Equine<span>Exchange</span></NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {links.map(({ to, label }) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
        </nav>
        <NavLink className="header-cta" to="/auctions">Explore auctions <span aria-hidden="true">↗</span></NavLink>
      </div>
    </header>
  )
}
