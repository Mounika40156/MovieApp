import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const addFavorite = (movie) => {
    setFavoriteMovies((prevMovies) => [...prevMovies, movie]);
  };

  const removeFavorite = (movieID) => {
    setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.imdbID !== movieID));
  };

  return (
    <FavoritesContext.Provider value={{ favoriteMovies, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
