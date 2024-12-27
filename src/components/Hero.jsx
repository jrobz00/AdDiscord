import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // Import auth from firebase.js

const Hero = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "Username");
      } else {
        setUser(null);
        setDisplayName("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDisplayName("");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleProtectedNavigation = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Navbar Section */}
      <div className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between py-4">
          <div className="text-lg font-bold tracking-wide">AdDiscord</div>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Home
            </Link>
            <button
              onClick={() => handleSearchClick()}
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Search Servers
            </button>
            <button
              onClick={() => handleProtectedNavigation("/add-server")}
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Add Discord Server
            </button>
            <button
              onClick={() => handleProtectedNavigation("/dashboard")}
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Dashboard
            </button>
            <Link
              to="/premium"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Premium
            </Link>

            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="relative px-6 py-3 font-semibold text-white transition-transform transform bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-xl focus:ring focus:ring-indigo-400"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-70 blur-md -z-10"></span>
                <span className="relative">Login</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  <span>{displayName}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg w-48 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-24 pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 opacity-60"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-600 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-500 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>

        <div className="relative container mx-auto px-6 md:px-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down">
            Discord Servers
          </h1>
          <p className="text-lg md:text-xl mb-10 animate-fade-in text-gray-300">
            Discover, join, and chat with thousands of communities that fit your
            interests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
