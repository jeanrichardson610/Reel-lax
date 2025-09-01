import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Placeholder from "../No_Image_Placeholder.png";
import { Link } from 'react-router';

const CardList = ({ title, category }) => {
  const [data, setData] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.results) {
          let movies = res.results;

          // Shuffle only for "popular"
          if (category === "popular") {
            for (let i = movies.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [movies[i], movies[j]] = [movies[j], movies[i]];
            }
          }

          setData(movies);
        }
      })
      .catch((err) => console.error(err));
  }, [category]);

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
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/movie/${item.id}`}>
            <div className="flex flex-col items-center gap-y-2 h-full">
              <img
                src={
                  item.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                    : Placeholder
                }
                alt={item.title || "Movie poster"}
                className="h-60 w-full object-center object-cover mt-10 rounded-xl"
              />
              <p className="text-center pt-2">{item.original_title}</p>
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
          color: #8854ff;
          box-shadow: 0 4px 12px rgba(255,255,255,0.8);
        }
        .mySwiper .swiper-button-next:hover::after,
        .mySwiper .swiper-button-prev:hover::after {
          font-size: 24px;
          font-weight: 900;
          text-shadow: 0 0 2px #8854ff, 0 0 6px #8854ff;
        }
      `}</style>
    </div>
  );
};

export default CardList;
