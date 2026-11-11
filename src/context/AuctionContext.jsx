import { createContext, useContext, useState } from 'react'
import { initialHorses } from '../data/horses.js'

const AuctionContext = createContext(null)

export function AuctionProvider({ children }) {
  const [horses, setHorses] = useState(initialHorses)

  function placeBid(horseId, bidder, amount) {
    setHorses((current) => current.map((horse) => horse.id === horseId
      ? { ...horse, currentBid: amount, bids: [{ name: bidder, amount, time: 'Just now' }, ...horse.bids] }
      : horse))
  }

  function addHorse(details) {
    const horse = {
      ...details,
      id: `${details.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      currentBid: Number(details.startingBid),
      startingBid: Number(details.startingBid),
      bids: [],
      endsAt: details.endsAt || '2026-12-15T18:00:00',
      status: 'Active',
      seller: 'Your stable',
    }
    setHorses((current) => [horse, ...current])
    return horse
  }

  return <AuctionContext.Provider value={{ horses, placeBid, addHorse }}>{children}</AuctionContext.Provider>
}

export function useAuctions() {
  const value = useContext(AuctionContext)
  if (!value) throw new Error('useAuctions must be used within AuctionProvider')
  return value
}
