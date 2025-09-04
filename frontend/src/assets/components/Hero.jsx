import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBookmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Placeholder from "../../assets/No_Image_Placeholder.png";
import { Link } from "react-router";
import { fetchWithCache } from "../../utils/cache";

const Hero = ({ type = "season" }) => {
  const [anime, setAnime] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const endpoint =
          type === "upcoming"
            ? "https://api.jikan.moe/v4/seasons/upcoming"
            : "https://api.jikan.moe/v4/seasons/now";

        const result = await fetchWithCache(endpoint);
        if (!result.data || result.data.length === 0)
          throw new Error("No anime found");

        const randomIndex = Math.floor(Math.random() * result.data.length);
        setAnime(result.data[randomIndex]);
      } catch (err) {
        console.error(err);
        setError("Failed to load Hero anime.");
      }
    }, 300); // stagger fetch
    return () => clearTimeout(timer);
  }, [type]);

  // Delay spinner appearance
  useEffect(() => {
    if (!loaded && anime) {
      const spinnerTimer = setTimeout(() => setShowSpinner(true), 800);
      return () => clearTimeout(spinnerTimer);
    }
  }, [loaded, anime]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!anime) return <p className="text-white p-4">Loading Hero...</p>;

  const backdropSrc = anime.images?.jpg?.image_url || Placeholder;
  const blurSrc = anime.images?.jpg?.small_image_url || Placeholder;

  return (
    <div className="text-white relative">
      <figure className="relative">
        <img
          src={blurSrc}
          alt={anime.title}
          className={`w-full rounded-2xl h-[480px] object-cover blur-xl scale-105 absolute top-0 left-0 transition-opacity duration-700 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={backdropSrc}
          alt={anime.title}
          className={`w-full rounded-2xl h-[480px] object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        {!loaded && showSpinner && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl z-10">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-4xl animate-spin text-[#00e5ff"
            />
          </div>
        )}
      </figure>

      {loaded && (
        <div className="absolute bottom-8 left-10 max-w-xl space-y-4 z-20">
          <h1 className="text-2xl md:text-4xl font-bold">{anime.title}</h1>
          <p className="hidden md:block text-base text-gray-200">
            {anime.synopsis
              ? anime.synopsis.length > 200
                ? anime.synopsis.slice(0, 200) + "…"
                : anime.synopsis
              : "No synopsis available."}
          </p>

          <div className="flex space-x-2 md:space-x-6 font-medium max-[400px]:flex-col max-[400px]:items-start max-[400px]:space-x-0 max-[400px]:space-y-2">
            <button className="flex justify-center items-center text-[#00e5ff] bg-black border-[#00e5ff] border-2 hover:bg-[#00e5ff] hover:text-black py-3 px-6 rounded-full text-sm w-auto max-w-fit">
              <FontAwesomeIcon
                icon={faBookmark}
                className="mr-2 w-4 h-5 md:w-5 md:h-5"
              />
              Save for later
            </button>

            <Link to={`/anime/${anime.mal_id}`}>
              <button className="flex justify-center items-center text-black bg-[#00e5ff] hover:bg-black hover:text-[#00e5ff] border-2 border-transparent hover:border-[#00e5ff] py-3 px-6 rounded-full text-sm w-auto max-w-fit">
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
