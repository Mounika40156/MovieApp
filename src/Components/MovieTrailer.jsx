import React from 'react';
import { useParams } from 'react-router-dom';

const MovieTrailer = () => {
  const { videoId } = useParams(); // Extract videoId from the URL parameter

  return (
    <div className="trailer-container">
      <div className="flex justify-center">
        <iframe
          width="100%"
          height="780"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          title="Movie Trailer"
        ></iframe>
      </div>
    </div>
  );
};

export default MovieTrailer;
