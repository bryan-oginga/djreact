import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on page load
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === movie.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
