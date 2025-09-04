import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Logo from "../zen_logo.svg";
import { Link } from "react-router";

const Navbar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // ⏱ 500ms debounce delay

    return () => clearTimeout(handler);
  }, [query]);

  // Fetch anime when debounced query changes
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery) {
        setSearchResults(null); // reset → show Hero.jsx
        return;
      }

      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&limit=5`
        );
        const data = await res.json();
        setSearchResults(data.data || []);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchData();
  }, [debouncedQuery, setSearchResults]);

  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      <figure className="flex items-center space-x-2">
        <Link to={"/"} className="flex items-center space-x-2">
          <img src={Logo} alt="zen Logo" className="w-10 cursor-pointer" />
          <p className="text-2xl font-bold text-[#00e5ff] drop-shadow-[0_0_8px_#00f5d4] cursor-pointer">
            Zenime
          </p>
        </Link>
      </figure>

      <ul className="hidden xl:flex space-x-6">
        <li>
          <Link to="/" className="cursor-pointer hover:text-[#00e5ff]">
            Home
          </Link>
        </li>
        <li className="cursor-pointer hover:text-[#00e5ff]">Now Airing</li>
        <li className="cursor-pointer hover:text-[#00e5ff]">Top Rated</li>
        <li className="cursor-pointer hover:text-[#00e5ff]">Movies</li>
        <li className="cursor-pointer hover:text-[#00e5ff]">Upcoming</li>
      </ul>

      <div className="flex items-center space-x-4 relative">
        {/* Search bar */}
        <div className="relative hidden md:inline-flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none hover:bg-[#3e3e3e] transition-colors duration-500 ease-in-out"
            placeholder="Search..."
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-2 right-4 text-xl text-[#ff007f]"
          />
        </div>

        {/* AI Picks */}
        <Link to="/anime/11617">
          <button className="bg-[#00e5ff] hidden sm:block px-5 py-2 text-black cursor-pointer rounded-full hover:bg-[#ff007f] hover:text-white transition-colors duration-500 ease-in-out">
            AI Anime Picks
          </button>
        </Link>

        <Link to={"/signin"}>
          <button className="border border-[#00e5ff] py-2 px-4 cursor-pointer rounded-full hover:bg-[#00e5ff] hover:text-black transition-colors duration-500 ease-in-out">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
