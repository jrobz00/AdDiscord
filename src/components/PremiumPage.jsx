import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // Ensure Firebase is correctly imported
import { motion } from "framer-motion";
import PricingCard from "./PricingCard"; // Make sure you have this component in your project

const PremiumPage = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle user login state
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
  }, [auth]);

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

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar Section */}
      <div className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between py-4">
          <div className="text-lg font-bold tracking-wide text-white">AdDiscord</div>
          <div className="flex items-center gap-6">
            {/* Navbar Links */}
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Search Servers
            </Link>
            <Link
              to="/add-server"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Add Discord Server
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/premium"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Premium
            </Link>

            {/* Conditional Rendering: Login Button or User Dropdown */}
            {!user ? (
              <button
                onClick={handleLogin}
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
      <div className="relative pt-24 pb-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 opacity-60"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-600 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-500 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>

        <div className="relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Unlock Premium Features
          </motion.h1>
          <motion.p
            className="text-gray-100 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Take your experience to the next level with exclusive tools and benefits.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pricing Cards */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-white">Basic Plan</h3>
            <p className="text-gray-400 text-lg mb-4">For new users looking to get started.</p>
            <p className="text-4xl font-semibold text-white mb-6">$5<span className="text-sm">/mo</span></p>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li>Access to basic analytics</li>
              <li>Customizable server pages</li>
            </ul>
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
              onClick={() => console.log("Basic Plan selected")}
            >
              Select Basic
            </button>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-white">Premium Plan</h3>
            <p className="text-gray-400 text-lg mb-4">For advanced users who want more features.</p>
            <p className="text-4xl font-semibold text-white mb-6">$15<span className="text-sm">/mo</span></p>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li>Advanced server analytics</li>
              <li>Automated role assignments</li>
              <li>Priority support</li>
            </ul>
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              onClick={() => console.log("Premium Plan selected")}
            >
              Select Premium
            </button>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
            <p className="text-gray-400 text-lg mb-4">For power users who need everything.</p>
            <p className="text-4xl font-semibold text-white mb-6">$30<span className="text-sm">/mo</span></p>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li>All premium features</li>
              <li>Exclusive customization</li>
              <li>Dedicated support</li>
            </ul>
            <button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg"
              onClick={() => console.log("Pro Plan selected")}
            >
              Select Pro
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
