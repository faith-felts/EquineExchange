import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuctionProvider } from './context/AuctionContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuctionProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AuctionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
