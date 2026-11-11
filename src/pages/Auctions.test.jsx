import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Auctions from './Auctions.jsx'
import { AuctionProvider } from '../context/AuctionContext.jsx'
import { FavoritesProvider } from '../context/FavoritesContext.jsx'

function renderAuctions() {
  return render(<MemoryRouter><AuctionProvider><FavoritesProvider><Auctions /></FavoritesProvider></AuctionProvider></MemoryRouter>)
}

describe('Auctions', () => {
  it('shows marketplace listings and filters by search text', () => {
    renderAuctions()
    expect(screen.getByRole('heading', { name: '4 horses to meet' })).toBeInTheDocument()
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search horses' }), { target: { value: 'Bend' } })
    expect(screen.getByRole('heading', { name: '1 horse to meet' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Juniper' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Atlas' })).not.toBeInTheDocument()
  })
})
