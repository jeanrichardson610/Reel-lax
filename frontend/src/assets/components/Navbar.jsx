import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Logo from "../Main_logo.svg";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      <figure>
        <Link to={"/"}>
          <img
            src={Logo}
            alt="Reel-lax Logo"
            className="w-30 cursor-pointer  "
          />
        </Link>
      </figure>
      <ul className="hidden xl:flex space-x-6">
        <li>
          <Link to="/" className="cursor-pointer hover:text-[#8854ff]">
            Home
          </Link>
        </li>
        <li className="cursor-pointer hover:text-[#8854ff]">TV Shows</li>
        <li className="cursor-pointer hover:text-[#8854ff]">Movies</li>
        <li className="cursor-pointer hover:text-[#8854ff]">Anime</li>
        <li className="cursor-pointer hover:text-[#8854ff]">Games</li>
        <li className="cursor-pointer hover:text-[#8854ff]">Popular</li>
        <li className="cursor-pointer hover:text-[#8854ff]">Upcoming</li>
      </ul>
      <div className="flex items-center space-x-4 relative">
        <div className="relative hidden md:inline-flex">
          <input
            type="text"
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none hover:bg-[#3e3e3e] transition-colors duration-500 ease-in-out"
            placeholder="Search..."
          />

          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-2 right-4 text-xl text-[#8854ff]"
          />
        </div>
        <button className="bg-[#8854ff] px-5 py-2 text-white cursor-pointer rounded-full hover:bg-[#3075ff] transition-colors duration-500 ease-in-out">
          AI Movie Picks
        </button>
        <Link to={"/signin"}>
          <button className="border border-[#8854ff] py-2 px-4 cursor-pointer rounded-full hover:bg-[#8854ff] hover:text-white transition-colors duration-500 ease-in-out">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
