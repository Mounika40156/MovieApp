import React, { useEffect, useState } from 'react';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSavedMovies } from './SavedMoviesContext';
import { useFavorites } from './FavoritesContext';

const favoriteMovies = [...new Set([
  'Game Changer', 'Pushpa: The Rule - Part 2', 'Daaku Maharaaj', 'Lucky Baskhar', 'Bachhala Malli',
  'Pushpa: The Rise - Part 1', 'Devara Part 1', 'Kalki 2898 AD', 'Salaar', 'C/o Kancharapalem',
  'Jersey', 'Mayabazar', 'Sita Ramam', 'Nuvvu Naaku Nachchav', 'Agent Sai Srinivasa Athreya',
  'Aha Naa Pellanta', 'Mahanati', 'Baahubali 2: The Conclusion', 'Aa Naluguru', 'Bommarillu',
  'Hi Nanna', 'Pelli Choopulu', 'Rangasthalam', 'Sankarabharanam', 'Manmadhudu', 'Athadu',
  'Mathu Vadalara', 'Evaru', 'Kshanam', 'Drushyam', 'Vedam', 'Aditya 369',
  'Gamyam', 'Baahubali: The Beginning', 'Prasthanam', 'Geethanjali', 'Tholi Prema', 'Oopiri',
  'Arjun Reddy', 'Shiva', 'Pokiri', 'Leader', 'Okkadu', 'Brochevarevarura', 'Manam', 'Happy Days',
  'RRR', 'Khushi', 'Goodachari', 'Colour Photo', 'Arya', 'Kick', 'Ee Nagaraniki Emaindi',
  'Anand', 'Eega', 'Nuvvostanante Nenoddantana', 'Magadheera', 'Malliswari',
  'LIE', 'Arjun Suravaram', 'Vikramarkudu', 'Vakeel Saab', 'Uppena', 'Sye', 'Soggade Chinni Nayana',
  'Sarileru Neekevvaru', 'Ghani', 'Bheemla Nayak', 'Sarrainodu', 'Orey Biryani', 'Sankranthi'
])];

const Display = ({ searchQuery = '' }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const { addMovie, removeMovie, savedMovies } = useSavedMovies();
  const { favoriteMovies: favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responses = await Promise.all(
          favoriteMovies.map(title =>
            fetch(`http://www.omdbapi.com/?t=${title}&apikey=5d3db5bc`).then(res => res.json())
          )
        );

        const validMovies = responses
          .filter(response => response.Response !== 'False')
          .reduce((uniqueMovies, movie) => {
            if (!uniqueMovies.some(m => m.imdbID === movie.imdbID)) {
              uniqueMovies.push(movie);
            }
            return uniqueMovies;
          }, []);

        setMovies(validMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMoreMovies = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleClickMovie = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000); 
  };

  const handleSaveMovie = (movie) => {
    if (savedMovies.some(m => m.imdbID === movie.imdbID)) {
      removeMovie(movie.imdbID); 
      showToast(`Removed "${movie.Title}" from Saved List`);
    } else {
      addMovie(movie); 
      showToast(`Added "${movie.Title}" to Saved List`);
    }
  };

  const handleFavoriteMovie = (movie) => {
    if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
      removeFavorite(movie.imdbID); 
      showToast(`Removed "${movie.Title}" from Favorites`);
    } else {
      addFavorite(movie); 
      showToast(`Added "${movie.Title}" to Favorites`);
    }
  };

  const indexOfLastMovie = currentPage * 30;
  const currentMovies = filteredMovies.slice(0, indexOfLastMovie);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="bg-black mt-[140px]">
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-md shadow-md z-50">
          {toastMessage}
        </div>
      )}

      <div className="grid grid-cols-5 gap-8 pl-10">
        {currentMovies.length > 0 ? currentMovies.map(movie => (
          <div key={movie.imdbID} className="relative group cursor-pointer">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/path/to/fallback-image.jpg'}
              alt={movie.Title}
              className="w-[250px] h-[300px] object-fill rounded-md group-hover:animate-zoomMove"
              onClick={() => handleClickMovie(movie)}
            />
            <div className="absolute top-3 right-8 text-2xl">
              <FaBookmark
                className={`cursor-pointer ${savedMovies.some(m => m.imdbID === movie.imdbID) ? "text-red-600" : "text-white hover:text-red-600"}`}
                onClick={() => handleSaveMovie(movie)}
              />
            </div>
            <div className="absolute top-11 right-8 text-2xl">
              <FaHeart
                className={`cursor-pointer ${favorites.some(fav => fav.imdbID === movie.imdbID) ? "text-red-600" : "text-white hover:text-red-600"}`}
                onClick={() => handleFavoriteMovie(movie)}
              />
            </div>
            <div className="absolute bottom-0 right-3 text-white text-xl font-semibold bg-black bg-opacity-50 px-2 py-1 rounded-t-sm">
              {movie.Title}
            </div>
          </div>
        )) : <div className="text-white text-center">No Movies Found</div>}
      </div>

      <div className="text-center mt-4">
        {filteredMovies.length > indexOfLastMovie && (
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md"
            onClick={loadMoreMovies}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Display;
