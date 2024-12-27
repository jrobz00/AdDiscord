import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase"; // Import Firestore and Firebase Auth
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Firestore functions
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Authentication

const DashboardPage = () => {
  const [servers, setServers] = useState([]);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

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

  useEffect(() => {
    // Fetch servers from Firestore when the user is logged in
    if (user) {
      fetchServers();
    }
  }, [user]);

  const fetchServers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "servers"));
      const userServers = querySnapshot.docs
        .filter((doc) => doc.data().userId === user.uid)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setServers(userServers);
    } catch (error) {
      console.error("Error fetching servers: ", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this server?"
    );
    if (confirmDelete) {
      try {
        // Delete server from Firestore
        await deleteDoc(doc(db, "servers", id));
        // Remove server from state
        setServers(servers.filter((server) => server.id !== id));
      } catch (error) {
        console.error("Error deleting server: ", error);
      }
    }
  };

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

  return (
    <div className="bg-gray-900 text-white min-h-screen">
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

      {/* Dashboard Content */}
      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Your Dashboard
          </h1>
          <p className="text-gray-400 mb-6 text-center">
            Manage the servers you’ve added to the platform.
          </p>
          <div className="space-y-6">
            {servers.length > 0 ? (
              servers.map((server) => (
                <div
                  key={server.id}
                  className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 text-xs font-medium"
                    >
                      {server.icon ? (
                        <img
                          src={URL.createObjectURL(server.icon)}
                          alt={server.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        "No Icon"
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{server.name}</h3>
                      <p className="text-sm text-gray-400">{server.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => alert(`Edit server with ID: ${server.id}`)}
                      className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-90 text-white px-4 py-2 rounded-md shadow-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(server.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No servers added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
