import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ServersContext } from "../context/ServersContext";
import { auth } from "../firebase"; // Import auth from firebase.js

const AddServerPage = () => {
  const [serverName, setServerName] = useState("");
  const [serverDescription, setServerDescription] = useState("");
  const [serverInviteLink, setServerInviteLink] = useState("");
  const [serverIcon, setServerIcon] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { addServer } = useContext(ServersContext);
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

    return () => unsubscribe(); // Cleanup subscription
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newServer = {
      id: Date.now(),
      name: serverName,
      description: serverDescription,
      banner: serverIcon ? URL.createObjectURL(serverIcon) : null,
      members: Math.floor(Math.random() * 1000) + 100,
      inviteLink: serverInviteLink,
    };

    addServer(newServer);
    alert("Server added successfully!");
    navigate("/search");
  };

  const handleIconChange = (file) => setServerIcon(file);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleIconChange(file);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
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
              onClick={() => navigate("/search")}
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Search Servers
            </button>
            <button
              onClick={() => navigate("/add-server")}
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Add Discord Server
            </button>
            <button
              onClick={() => navigate("/dashboard")}
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
                {/* Dropdown Menu */}
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

      {/* Add Server Form */}
      <div className="pt-24 flex items-center justify-center px-4 flex-grow">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Add Your Discord Server
          </h1>
          <p className="text-gray-400 mb-4 text-center text-sm">
            Provide the details of your server to add it to our platform.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="serverName"
              >
                Server Name
              </label>
              <input
                id="serverName"
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Enter your server name"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none shadow-md placeholder-gray-400"
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="serverDescription"
              >
                Server Description
              </label>
              <textarea
                id="serverDescription"
                value={serverDescription}
                onChange={(e) => setServerDescription(e.target.value)}
                placeholder="Enter a short description of your server"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none shadow-md placeholder-gray-400"
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="serverInviteLink"
              >
                Discord Server Invite Link
              </label>
              <input
                id="serverInviteLink"
                type="url"
                value={serverInviteLink}
                onChange={(e) => setServerInviteLink(e.target.value)}
                placeholder="Enter your Discord server invite link"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none shadow-md placeholder-gray-400"
              />
            </div>
            <div
              className={`mb-3 border-2 ${
                isDragging
                  ? "border-purple-500 bg-gray-700"
                  : "border-dashed border-gray-500"
              } rounded-lg p-4 h-24 flex items-center justify-center text-center`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div>
                <p className="text-gray-400 text-sm">
                  Drag and drop your server banner here, or click to upload.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleIconChange(e.target.files[0])}
                  className="hidden"
                  id="serverIconInput"
                />
                <label
                  htmlFor="serverIconInput"
                  className="cursor-pointer text-indigo-500 hover:underline text-sm"
                >
                  Browse files
                </label>
                {serverIcon && (
                  <p className="text-sm text-gray-400 mt-2">
                    Selected: {serverIcon.name}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-90 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 font-semibold"
            >
              Add Server
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServerPage;
