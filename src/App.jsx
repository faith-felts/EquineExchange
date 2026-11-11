import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Auctions from './pages/Auctions.jsx'
import HorseDetails from './pages/HorseDetails.jsx'
import SellerDashboard from './pages/SellerDashboard.jsx'
import BuyerAccount from './pages/BuyerAccount.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/horses/:horseId" element={<HorseDetails />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/account" element={<BuyerAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand footer-brand" href="/">Equine<span>Exchange</span></a>
          <p>Good matches start with good horsemanship.</p>
          <span>© 2026 Equine Exchange · A class project</span>
        </div>
      </footer>
    </div>
  )
}
