import React from 'react'
import Navbar from './assets/components/Navbar'
import Homepage from './pages/Homepage'
import { Route, Routes } from 'react-router'
import Moviepage from './pages/Moviepage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Define your routes here */}
        <Route path={"/"} element={<Homepage />} />
        {/* Add more routes as needed */}
        <Route path={"/movie/:id"} element={<Moviepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      </div>
  )
}

export default App