import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // Correct import
import { UserIcon } from "@heroicons/react/24/solid";
import { ServersContext } from "../context/ServersContext"; // Ensure ServersContext is imported
import { motion } from "framer-motion"; // Import motion from framer-motion

const SearchDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { servers } = useContext(ServersContext); // Use servers from context (ensure you have ServersContext providing this)

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

  const handleProtectedNavigation = (path) => {
    if (!user) {
      alert("You need to be logged in to access this page.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const filteredServers = servers.filter((server) =>
    server.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar Section */}
      <motion.div
        className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
              onClick={() => navigate("/search")}
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
      </motion.div>

      {/* Search Section */}
      <div className="container mx-auto px-6 md:px-12 py-24">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Search Directory
        </motion.h1>
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for servers..."
            className="w-full max-w-md bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {filteredServers.length > 0 ? (
            filteredServers.map((server) => (
              <motion.div
                key={server.id}
                className="bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 overflow-hidden"
                variants={{
                  hidden: { scale: 0.9, opacity: 0 },
                  visible: { scale: 1, opacity: 1 },
                }}
              >
                <img
                  src={server.banner || 'default-banner-url'}  // Add a fallback image if banner is undefined
                  alt={`${server.name} banner`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{server.name}</h2>
                  <p className="text-gray-400 mb-2">{server.description}</p>
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
                    {server.members.toLocaleString()} members
                  </div>
                  <a
                    href={server.inviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold inline-block text-center"
                  >
                    Join Server
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No servers found.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchDirectory;
