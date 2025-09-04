import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Reel from "../assets/zen_logo.svg";


const SignUp = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("Usernam: ", username, "\nEmail: ", email, "\nPassword: ", password)

  return (
    <div className="min-h-screen bg-black/50 bg-blend-overlay bg-cover bg-center px-4 md:px-8 py-5" 
         style={{ backgroundImage: "url('/Zenime/Signin_Image.jpg')" }}>
      {/* Optional content goes here */}
      <div className="max-w-[450px] w-full bg-black bg-opacity-75 rounded-2xl px-8 py-10 mx-auto mt-8">
        <figure>
            <img src={Reel} alt="" className="w-15 mx-auto mb-2"/>
        </figure>
        <h1 className="text-3xl font-medium text-white mb-7">Sign Up</h1>

        <form className="flex flex-col space-y-4">
            <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} placeholder="Enter name here" className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base hover:bg-[#4e4e4e]"/>
            <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)}  placeholder="Enter your email" className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base hover:bg-[#4e4e4e]" /> 
            <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password" className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base hover:bg-[#4e4e4e]" /> 

            <button type="submit" className="w-full bg-[#00e5ff] text-black py-2 rounded text-base hover:opacity-100 hover:shadow-[0_0_6px_white] hover:scale-105 cursor-pointer transition-all">
                Sign Up
            </button>
        </form>

        <div className="mt-10 text-[#9a9a9a] text-sm">
            <p>Already a <span className="font-semibold text-[#00e5ff]">Zenime</span> member? <span onClick={() => navigate("/signin")} className="text-white font-medium cursor-pointer ml-2 hover:underline">Sign In Here</span></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp