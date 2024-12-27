// src/components/PricingCard.jsx
import React from "react";
import { motion } from "framer-motion";

const PricingCard = ({ title, price, features, buttonText, onClick }) => {
  return (
    <motion.div
      className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-xs mx-auto"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 mb-6">{price}</p>
      <ul className="space-y-4 text-gray-300 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-4">
            <span className="w-6 h-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              ✔
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg shadow-lg font-semibold transition-all duration-300"
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

export default PricingCard;
