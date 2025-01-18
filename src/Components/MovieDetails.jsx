import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieTrailer from './MovieTrailer';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [videoId, setVideoId] = useState(null);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const emojis = ['😆', '😌', '😲', '☹️', '😠', '🥺', '🙂‍↔️', '🙂‍↕️', '☠️', '👻', '🙈', '😂', '😘', '😁', '😊', '🤗', '😏', '😭', '🥵', '🫨'];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=5d3db5bc`);
        const data = await response.json();

        if (data.Response !== 'False') {
          setMovie(data);
          fetchRecommendations();
          fetchMovieTrailer(data.Title);
        } else {
          console.error('Movie not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=action&apikey=5d3db5bc`);
        const data = await response.json();
        if (data.Response !== 'False') {
          setRecommendedMovies(data.Search);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    const fetchMovieTrailer = async (movieTitle) => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieTitle}+trailer&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          setVideoId(videoId);
        } else {
          console.error("Trailer not found");
          setVideoId(null);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
        setVideoId(null);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading Movie Details...</div>;
  }

  if (!movie) {
    return <div className="text-center py-10">Movie not found!</div>;
  }

  return (
    <>
      <div className="flex flex-row relative">
        <h1 className="text-red-600 font-extrabold text-3xl absolute top-7 left-[100px]">Movies</h1>
        <p className="text-white font-extrabold text-2xl mt-[20px] fonts-m animate-bounce">
          <span className="text-4xl  mt-[60px] ml-[200px]">{emojis[currentEmoji]}</span>
        </p>
      </div>
      <div className="movie-details-container bg-black px-10 mt-[50px] ml-[40px] flex gap-16">
        <div className="w-3/4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white mb-[50px] rounded-md hover:text-red-600 hover:underline"
          >
            &lt; Back to Dashboard
          </button>

          <div className="flex gap-10">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/path/to/fallback-image.jpg'}
              alt={movie.Title}
              className="w-[400px] h-[500px] object-cover rounded-lg"
            />
            <div className="text-white">
              <h2 className="text-4xl font-semibold mb-4">{movie.Title}</h2>
              <p className="text-lg mb-4">{movie.Plot}</p>
              <p className="mb-4"><strong>Release Date:</strong> {movie.Released}</p>
              <p className="mb-4"><strong>Runtime:</strong> {movie.Runtime}</p>
              <p className="mb-4"><strong>Box Office:</strong> {movie.BoxOffice || 'N/A'}</p>
              <p className="mb-4"><strong>Awards:</strong> {movie.Awards || 'None'}</p>
              <p className="mb-4"><strong>Rating:</strong> {movie.imdbRating}/10</p>
              <p className=" mb-4"><strong>Actors:</strong> {movie.Actors}</p>

              <button
                onClick={() => navigate(`/trailer/${videoId}`)}
                className="bg-red-600 text-white px-6 py-2 rounded-md absolute hover:bg-red-800 mt-[30px]"
              >
                Watch Now
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/4 text-white">
          <h3 className="text-2xl font-semibold text-white mb-4">Recommended Movies</h3>
          <ul>
            {recommendedMovies.length > 0 ? (
              recommendedMovies.map((recommendedMovie) => (
                <li key={recommendedMovie.imdbID} className="mb-4">
                  <a href={`/movie/${recommendedMovie.imdbID}`} className="flex items-center gap-4">
                    <img
                      src={recommendedMovie.Poster !== 'N/A' ? recommendedMovie.Poster : '/path/to/fallback-image.jpg'}
                      alt={recommendedMovie.Title}
                      className="w-[100px] h-[100px] object-cover rounded-md"
                    />
                    <span>{recommendedMovie.Title}</span>
                  </a>
                </li>
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
