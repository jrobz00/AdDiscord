import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">About AdDiscord</h3>
            <p className="text-sm leading-6">
              addiscord.com is your go-to platform for discovering, connecting, and
              managing Discord servers. Join thousands of communities and make
              meaningful connections today.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/add-server"
                  className="hover:text-white transition duration-300"
                >
                  Add Discord Server
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-white transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/premium"
                  className="hover:text-white transition duration-300"
                >
                  Premium
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Stay Connected</h3>
            <p className="text-sm mb-3">
              Follow us on social media for updates and more:
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition duration-300"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition duration-300"
              >
                Discord
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-800 pt-6 text-sm">
          <p>
            © {new Date().getFullYear()} AdDiscord. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
