import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HorseCard from './HorseCard.jsx'
import { FavoritesProvider } from '../context/FavoritesContext.jsx'
import { initialHorses } from '../data/horses.js'

function renderCard() {
  return render(<MemoryRouter><FavoritesProvider><HorseCard horse={initialHorses[0]} /></FavoritesProvider></MemoryRouter>)
}

describe('HorseCard', () => {
  it('renders listing information and links to the horse details', () => {
    renderCard()
    expect(screen.getByRole('heading', { name: 'Juniper' })).toBeInTheDocument()
    expect(screen.getByText('$9,200')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: "View Juniper's listing" })).toHaveAttribute('href', '/horses/juniper')
  })

  it('toggles a horse in the favorites context', () => {
    renderCard()
    const saveButton = screen.getByRole('button', { name: 'Save Juniper' })
    fireEvent.click(saveButton)
    expect(screen.getByRole('button', { name: 'Remove Juniper from saved horses' })).toHaveAttribute('aria-pressed', 'true')
  })
})
