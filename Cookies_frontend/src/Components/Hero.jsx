import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Welcome to User Login App
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Secure, fast, and reliable user authentication with role-based
            access using the MERN stack.
          </p>
          <div className="flex space-x-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-8 py-3 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-white text-purple-600 px-8 py-3 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-20 bg-white">
          {/* Add a wave or illustration here if you want */}
        </div>
      </section>
    </>
  );
}

export default Hero;
