import React from "react";
import Hero from "../assets/components/Hero";
import CardList from "../assets/components/CardList";
import Footer from "../assets/components/Footer";

const Homepage = () => {
  return (
    <div className="p-5">
      <Hero type="season" />        {/* Now Airing Hero */}
      <CardList title="Now Airing" type="season" />
      <CardList title="Top Rated" type="top" />
      {/* Removed Most Popular & Upcoming to reduce 429 errors */}
      <Footer />

    </div>
  );
};

export default Homepage;
