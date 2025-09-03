import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Placeholder from "../assets/No_Image_Placeholder.png";
import { fetchWithCache } from "../utils/cache";

const AnimePage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recLoading, setRecLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch main anime data
  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const url = `https://api.jikan.moe/v4/anime/${id}`;
        const result = await fetchWithCache(url);

        if (!result.data) throw new Error("Anime not found");

        setAnime(result.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load anime. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id]);

  // Fetch recommendations after main anime loads
  useEffect(() => {
    if (!anime) return;

    const fetchRecommendations = async () => {
      setRecLoading(true);
      try {
        const url = `https://api.jikan.moe/v4/anime/${id}/recommendations`;
        const result = await fetchWithCache(url);

        if (result.data && result.data.length > 0) {
          const recs = result.data.slice(0, 5).map((rec) => rec.entry);

          setRecommendations(recs);
        }
      } catch (err) {
        console.error("Failed to load recommendations", err);
      } finally {
        setRecLoading(false);
      }
    };

    const timer = setTimeout(fetchRecommendations, 400);
    return () => clearTimeout(timer);
  }, [anime, id]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!anime) return null;

  // Determine images: horizontal banner preferred
  const banner = anime.images?.jpg?.image_url;
  const poster = anime.images?.jpg?.large_image_url;

  return (
    <div className="text-white p-6">
      {/* Banner + Poster */}
      <div className="relative w-full max-w-6xl mx-auto mb-6 rounded-xl overflow-hidden">
        {banner ? (
          <>
            <img
              src={banner}
              alt={anime.title}
              className="w-full h-100 object-cover rounded-xl"
            />
            {poster && (
              <img
                src={poster}
                alt={anime.title}
                className="absolute bottom-0 left-4 h-40 object-cover rounded-xl shadow-lg border-2 border-gray-700"
              />
            )}
          </>
        ) : (
          <img
            src={poster || Placeholder}
            alt={anime.title}
            className="w-full max-w-lg object-cover rounded-xl"
          />
        )}
      </div>

      {/* Anime Info */}
      <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
      <p className="text-gray-300 mb-4">
        {anime.synopsis || "No synopsis available."}
      </p>
      <div className="text-sm text-gray-400 space-y-1 mb-6">
        <p><strong>Type:</strong> {anime.type || "N/A"}</p>
        <p><strong>Episodes:</strong> {anime.episodes || "?"}</p>
        <p><strong>Year:</strong> {anime.year || "Unknown"}</p>
        <p><strong>Score:</strong> {anime.score || "N/A"}</p>
      </div>

      {/* Recommendations */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>

        {recLoading && recommendations.length === 0 && (
          <p className="text-white">Loading recommendations...</p>
        )}

        {recommendations.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {recommendations.map((rec) => (
              <Link key={rec.mal_id} to={`/anime/${rec.mal_id}`}>
                <img
                  src={rec.images?.jpg?.image_url || Placeholder}
                  alt={rec.title}
                  className="rounded-lg object-cover w-full h-40 hover:scale-105 transition-transform"
                />
                <p className="text-sm text-center mt-1 truncate">{rec.title}</p>
              </Link>
            ))}
          </div>
        )}

        {!recLoading && recommendations.length === 0 && (
          <p className="text-gray-400">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default AnimePage;
