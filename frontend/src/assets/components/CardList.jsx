import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Placeholder from "../../assets/No_Image_Placeholder.png";
import { Link } from "react-router";
import { fetchWithCache } from "../../utils/cache";

const CardList = ({ title, type = "top", filter = "", shuffle = false }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        let url;
        switch (type) {
          case "season": url = "https://api.jikan.moe/v4/seasons/now"; break;
          case "upcoming": url = "https://api.jikan.moe/v4/seasons/upcoming"; break;
          case "top": url = `https://api.jikan.moe/v4/top/anime${filter ? "?filter=" + filter : ""}`; break;
          default: url = "https://api.jikan.moe/v4/top/anime"; break;
        }

        const result = await fetchWithCache(url);
        if (!result.data) throw new Error("Failed to fetch anime list.");

        let animeList = [...result.data];
        if (shuffle) {
          for (let i = animeList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [animeList[i], animeList[j]] = [animeList[j], animeList[i]];
          }
        }

        setData(animeList);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not load anime list. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, 300); // stagger fetch

    return () => clearTimeout(timer);
  }, [type, filter, shuffle]);

  if (loading) return <p className="text-white p-4">Loading {title}...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>
      <Swiper
        slidesPerView={1}
        slidesPerGroup={4}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          768: { slidesPerView: 3, slidesPerGroup: 3 },
          1024: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
        pagination={{ type: "progressbar" }}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((anime) => (
          <SwiperSlide key={anime.mal_id}>
            <Link to={`/anime/${anime.mal_id}`}>
              <div className="flex flex-col items-center gap-y-2 h-full">
                <img
                  src={anime.images?.jpg?.image_url || Placeholder}
                  alt={anime.title}
                  className="h-60 w-full object-cover mt-10 rounded-xl"
                />
                <p className="text-center pt-2">{anime.title}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .mySwiper {
          position: relative;
        }
        .swiper-button-next,
        .swiper-button-prev {
          top: 50%;
          color: white;
          border: 2px solid white;
          border-radius: 9999px;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.6);
          transition: all 0.3s ease;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after { font-size: 18px; }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          transform: scale(1.15);
          border: none;
          background: white;
          color: #00e5ff;
          box-shadow: 0 4px 12px rgba(255,255,255,0.8);
        }
        .mySwiper .swiper-button-next:hover::after,
        .mySwiper .swiper-button-prev:hover::after {
          font-size: 24px;
          font-weight: 900;
          text-shadow: 0 0 2px #00e5ff, 0 0 6px #00e5ff;
        }
      `}</style>
    </div>
  );
};

export default CardList;
