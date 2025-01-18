import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from './FavoritesContext'; // Create this context

const FavoritesList = () => {
  const { favoriteMovies, removeFavorite } = useFavorites(); // Access favorite movies
  const [filteredMovies, setFilteredMovies] = useState(favoriteMovies);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFilteredMovies(favoriteMovies);
      setLoading(false);
    }, 1000);
  }, [favoriteMovies]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const filtered = favoriteMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [debouncedSearchQuery, favoriteMovies]);

  const handleRemoveFavorite = (movieID) => {
    removeFavorite(movieID); 
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen mt-[50px] rounded-lg">
      <div className="flex items-center justify-items-start mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white px-2 py-2 rounded-lg hover:text-red-600 hover:underline"
        >
          &lt; Back
        </button>
        <h2 className="text-3xl text-white ml-[50px] font-bold">Favorite Movies</h2>
      </div>

      <div className="relative mt-[20px] mb-6">
        <input
          className="bg-zinc-800 min-h-11 w-[40em] rounded-3xl pl-12 pr-14 text-white placeholder:text-white"
          placeholder="Search movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        </div>
      ) : filteredMovies.length === 0 ? (
        <p className="text-white text-center">No favorite movies found.</p>
      ) : (
        <div className="space-y-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                  alt={movie.Title}
                  className="w-24 h-36 object-cover rounded"
                />
                <h3 className="text-white text-lg">{movie.Title}</h3>
              </div>
              <button
                onClick={() => handleRemoveFavorite(movie.imdbID)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
