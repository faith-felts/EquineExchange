import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import HorseDetails from './HorseDetails.jsx'
import { AuctionProvider } from '../context/AuctionContext.jsx'
import { FavoritesProvider } from '../context/FavoritesContext.jsx'

afterEach(() => vi.unstubAllGlobals())

function renderDetails() {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ title: 'Quarter Horse', extract: 'Breed background.' }),
  }))
  return render(
    <MemoryRouter initialEntries={['/horses/juniper']}>
      <AuctionProvider>
        <FavoritesProvider>
          <Routes><Route path="/horses/:horseId" element={<HorseDetails />} /></Routes>
        </FavoritesProvider>
      </AuctionProvider>
    </MemoryRouter>,
  )
}

describe('HorseDetails', () => {
  it('accepts a valid bid in $100 increments and updates the listing', () => {
    const { container } = renderDetails()
    fireEvent.change(screen.getByLabelText(/Your bid/), { target: { value: '9300' } })
    fireEvent.click(screen.getByRole('button', { name: /Place a bid/ }))
    expect(screen.getByText('Your bid has been added. Good luck!')).toBeInTheDocument()
    expect(container.querySelector('.current-bid')).toHaveTextContent('$9,300')
    expect(screen.getByText('You')).toBeInTheDocument()
  })
})
