import React from 'react'
import Navbar from './assets/components/Navbar'
import Homepage from './pages/Homepage'
import { Route, Routes } from 'react-router'
import Animepage from './pages/Animepage'
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
        <Route path={"/anime/:id"} element={<Animepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      </div>
  )
}

export default App