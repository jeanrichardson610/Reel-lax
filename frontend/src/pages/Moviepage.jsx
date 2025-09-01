import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import Placeholder from "../assets/No_Image_Placeholder.png";

const Moviepage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);
  const heroRef = useRef(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  // Scroll to hero on movie load
  useEffect(() => {
    if (movie && heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [id, movie]);

  // Fetch movie, recommendations, and trailer
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, recRes, vidRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options).then((r) => r.json()),
          fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options).then((r) => r.json()),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options).then((r) => r.json()),
        ]);

        // Check for API errors
        if (movieRes.status_code) throw new Error(movieRes.status_message);
        if (recRes.status_code) throw new Error(recRes.status_message);
        if (vidRes.status_code) throw new Error(vidRes.status_message);

        setMovie(movieRes);
        setRecommendations(recRes.results || []);
        const trailer = vidRes.results?.find((v) => v.site === "YouTube" && v.type === "Trailer");
        setTrailerKey(trailer?.key || null);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie data. Please try again later.");
      }
    };
    fetchData();
  }, [id]);

  // Delay spinner
  useEffect(() => {
    if (!loaded && movie) {
      const timer = setTimeout(() => setShowSpinner(true), 800);
      return () => clearTimeout(timer);
    }
  }, [loaded, movie]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-[#181818]">
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#181818]">
        <FontAwesomeIcon icon={faSpinner} className="text-4xl animate-spin text-[#8854ff]" />
      </div>
    );
  }

  const blurSrc = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`
    : Placeholder;

  const backdropSrc = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : Placeholder;

  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : Placeholder;

  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <div ref={heroRef} className="relative h-[60vh] rounded-2xl overflow-hidden">
        <img
          src={blurSrc}
          alt={movie.title || "Movie poster"}
          className={`w-full h-full object-cover blur-xl scale-105 absolute top-0 left-0 transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
        />
        <img
          src={backdropSrc}
          alt={movie.title || "Movie poster"}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>

        {!loaded && showSpinner && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl animate-spin text-[#8854ff]" />
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex items-end gap-6 z-10">
          <img src={posterSrc} alt={movie.title || "Poster"} className="rounded-lg shadow-lg w-48 hidden md:block" />
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title || "No Title"}</h1>
            <div className="flex items-center gap-4 mb-2">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faStar} className="text-lg text-[#f3cb06] drop-shadow-[0_0_6px_#000000] mr-1" />
                {movie.vote_average?.toFixed(1) || "N/A"}
              </span>
              <span>{movie.release_date || "N/A"}</span>
              <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">{genre.name}</span>
              )) || "No genres"}
            </div>
            <p className="max-w-2xl text-gray-200">{movie.overview || "No overview available."}</p>
            {trailerKey && (
              <Link to={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank">
                <button className="flex justify-center items-center text-white bg-[#8854ff] hover:bg-white hover:text-[#8854ff] border-2 border-transparent hover:border-[#8854ff] hover:border-2 py-3 px-6 rounded-full cursor-pointer text-sm w-auto mt-4">
                  <FontAwesomeIcon icon={faPlay} className="mr-2 w-4 h-5 md:w-5 md:h-5" />
                  Watch Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ul className="text-gray-300 space-y-3">
              <li><span className="font-semibold text-white">Status: </span><span className="ml-2">{movie.status || "N/A"}</span></li>
              <li><span className="font-semibold text-white">Release Date: </span><span className="ml-2">{movie.release_date || "N/A"}</span></li>
              <li><span className="font-semibold text-white">Original Language: </span><span className="ml-2">{movie.original_language?.toUpperCase() || "N/A"}</span></li>
              <li><span className="font-semibold text-white">Budget: </span><span className="ml-2">{movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}</span></li>
              <li><span className="font-semibold text-white">Revenue: </span><span className="ml-2">{movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}</span></li>
              <li><span className="font-semibold text-white">Production Companies: </span><span className="ml-2">{movie.production_companies?.length > 0 ? movie.production_companies.map((c) => c.name).join(", ") : "N/A"}</span></li>
              <li><span className="font-semibold text-white">Spoken Languages: </span><span className="ml-2">{movie.spoken_languages?.length > 0 ? movie.spoken_languages.map((l) => l.english_name).join(", ") : "N/A"}</span></li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">Tagline: </h3>
            <p className="italic text-gray-400 mb-6">{movie.tagline || "No tagline available."}</p>
            <h3 className="font-semibold text-white mb-2">Overview: </h3>
            <p className="text-gray-200">{movie.overview || "No overview available."}</p>
          </div>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">You may also like...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {recommendations.slice(0, 10).map((rec) => (
              <div key={rec.id} className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition">
                <Link to={`/movie/${rec.id}`}>
                  <img src={rec.poster_path ? `https://image.tmdb.org/t/p/w500/${rec.poster_path}` : Placeholder} alt={rec.title || "Movie"} className="w-full h-60 object-cover" />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold mt-2">{rec.title || "No title"}</h3>
                    <span className="text-xs text-gray-400">{rec.release_date?.slice(0, 4) || "N/A"}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Moviepage;
