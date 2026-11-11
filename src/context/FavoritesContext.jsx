import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  function toggleFavorite(horseId) {
    setFavorites((current) => current.includes(horseId)
      ? current.filter((id) => id !== horseId)
      : [...current, horseId])
  }

  return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const value = useContext(FavoritesContext)
  if (!value) throw new Error('useFavorites must be used within FavoritesProvider')
  return value
}
