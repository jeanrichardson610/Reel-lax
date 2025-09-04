import React, { useState } from "react";
import Navbar from "./assets/components/Navbar";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router";
import Animepage from "./pages/Animepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div>
      <Navbar setSearchResults={setSearchResults} />

      {/* If search results exist, show them instead of normal routes */}
      {searchResults ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6">
          {searchResults.map((anime) => (
            <div key={anime.mal_id} className="bg-[#111] p-4 rounded">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="rounded mb-2"
              />
              <h3 className="text-white text-sm">{anime.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <Routes>
          <Route path={"/"} element={<Homepage />} />
          <Route path={"/anime/:id"} element={<Animepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
