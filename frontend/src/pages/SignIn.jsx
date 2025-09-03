import React from "react";
import Reel from "../assets/zen_logo.svg";
import { useNavigate } from "react-router";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log("Username: ", username, "\nPassword: ", password);

  return (
    <div
      className="min-h-screen bg-black/50 bg-blend-overlay bg-cover bg-center px-4 md:px-8 py-5"
      style={{ backgroundImage: "url('/Signin_Image.jpg')" }}
    >
      {/* Optional content goes here */}
      <div className="max-w-[450px] w-full bg-black bg-opacity-75 rounded-2xl px-8 py-10 mx-auto mt-8">
        <figure>
          <img src={Reel} alt="" className="w-15 mx-auto mb-2" />
        </figure>
        <h1 className="text-3xl font-medium text-white mb-7">Sign In</h1>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base hover:bg-[#4e4e4e]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base hover:bg-[#4e4e4e]"
          />

          <button
            type="submit"
            className="w-full bg-[#00e5ff] text-black py-2 rounded text-base 
             transform transition-all duration-300 ease-in-out
             hover:scale-105 hover:shadow-[0_0_6px_white] cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 text-[#9a9a9a] text-sm">
          <p>
            Wanna get your <span className="font-semibold text-[#00e5ff]">Zenime</span> on?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-white font-medium cursor-pointer ml-2 hover:underline"
            >
              Sign Up Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
