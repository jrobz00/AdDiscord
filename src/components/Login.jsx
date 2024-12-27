import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication
import { auth } from "../firebase"; // Ensure you have Firebase initialized in a separate file (firebase.js)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Firebase auth instance
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      // Redirect to dashboard or another page
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
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
            <button
              onClick={() => (window.location.href = "/register")}
              className="relative px-6 py-3 font-semibold text-white transition-transform transform bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-xl focus:ring focus:ring-indigo-400"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-70 blur-md -z-10"></span>
              <span className="relative">Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="relative bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md mt-16 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to Your Account</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </div>

      {/* Decorative Background Animations */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-600 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-500 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>
    </div>
  );
};

export default Login;
