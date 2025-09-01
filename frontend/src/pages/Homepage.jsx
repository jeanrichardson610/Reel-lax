import React from 'react'
import Hero from '../assets/components/Hero'
import CardList from '../assets/components/CardList'
import Footer from '../assets/components/Footer'

const Homepage = () => {
  return (
    <div className='p-5'>
        <Hero />
        <CardList title="Now Playing" category={"now_playing"} />
        <CardList title="Top Rated" category={"top_rated"} />
        <CardList title="Popular" category={"popular"} />
        <CardList title="Upcoming" category={"upcoming"} />
        <Footer />
    </div>
  )
}

export default Homepage