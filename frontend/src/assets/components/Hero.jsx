import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBookmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Placeholder from "../No_Image_Placeholder.png";
import { Link } from "react-router";

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          setMovie(res.results[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Delay spinner appearance if image is slow to load
  useEffect(() => {
    if (!loaded && movie) {
      const timer = setTimeout(() => setShowSpinner(true), 800);
      return () => clearTimeout(timer);
    }
  }, [loaded, movie]);

  if (!movie) return null;

  const backdropSrc = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : Placeholder;
  const blurSrc = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`
    : Placeholder;

  return (
    <div className="text-white relative">
      <figure className="relative">
        {/* Blurred Placeholder */}
        <img
          src={blurSrc}
          alt={movie.title || "Movie poster"}
          className={`w-full rounded-2xl h-[480px] object-center object-cover blur-xl scale-105 absolute top-0 left-0 transition-opacity duration-700 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* High-res image */}
        <img
          src={backdropSrc}
          alt={movie.title || "Movie poster"}
          className={`w-full rounded-2xl h-[480px] object-center object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Spinner for slow loads */}
        {!loaded && showSpinner && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl z-10">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-4xl animate-spin text-[#8854ff]"
            />
          </div>
        )}
      </figure>

      {/* Content over image */}
      {loaded && (
        <div className="absolute bottom-8 left-10 max-w-xl space-y-4 z-20">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight truncate md:whitespace-normal md:truncate-none max-w-xs md:max-w-xl">
            {movie.title}
          </h1>

          <p className="hidden md:block text-base text-gray-200 line-clamp-3">
            {movie.overview}
          </p>

          {/* Buttons: stack on small screens */}
          <div className="flex space-x-2 md:space-x-6 font-medium max-[400px]:flex-col max-[400px]:space-x-0 max-[400px]:space-y-2">
            <button className="flex justify-center items-center text-[#8854ff] bg-white hover:bg-[#8544ff] hover:text-white border-2 border-transparent py-3 px-6 rounded-full cursor-pointer text-sm w-auto">
              <FontAwesomeIcon
                icon={faBookmark}
                className="mr-2 w-4 h-5 md:w-5 md:h-5"
              />
              Save for later
            </button>
            <Link to={`/movie/${movie.id}`}>
              <button className="flex justify-center items-center text-white bg-[#8854ff] hover:bg-white hover:text-[#8854ff] border-2 border-transparent hover:border-[#8854ff] hover:border-2 py-3 px-6 rounded-full cursor-pointer text-sm w-auto">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="mr-2 w-4 h-5 md:w-5 md:h-5"
                />
                Watch Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
