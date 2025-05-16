import React, { createContext, useState, useContext } from "react";

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (book) => {
    if (!book) return;
    setFavorites((prev) => {
      const exists = prev.some(item => item._id === book._id);
      if (!exists) {
        return [...prev, book];
      }
      return prev;
    });
  };

  const removeFromFavorites = (bookId) => {
    setFavorites((prev) => prev.filter(item => item._id !== bookId));
  };

  const isInFavorites = (bookId) => {
    return favorites.some(item => item._id === bookId);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        favoritesCount: favorites.length
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
} 