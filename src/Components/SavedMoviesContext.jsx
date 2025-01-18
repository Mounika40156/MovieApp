import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedMoviesContext = createContext();

export const SavedMoviesProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState(() => {
    const saved = localStorage.getItem('savedMovies');
    return saved ? JSON.parse(saved) : [];
  });

  const addMovie = (movie) => {
    setSavedMovies((prev) => {
      const updatedMovies = [...prev, movie];
      localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };

  const removeMovie = (movieID) => {
    setSavedMovies((prev) => {
      const updatedMovies = prev.filter((movie) => movie.imdbID !== movieID);
      localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, addMovie, removeMovie }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = () => useContext(SavedMoviesContext);
