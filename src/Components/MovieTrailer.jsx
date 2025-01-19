import React from 'react';
import { useParams } from 'react-router-dom';

const MovieTrailer = () => {
  const { videoId } = useParams();

  return (
    <div className="trailer-container flex flex-col items-center justify-center h-screen bg-black">
      <iframe
        width="100%"
        height="780"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default MovieTrailer;
