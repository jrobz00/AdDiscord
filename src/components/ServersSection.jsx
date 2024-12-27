import React, { useState, useEffect } from "react";
import {
  UsersIcon,
  SparklesIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const FeatureCard = ({ title, description, Icon }) => (
  <motion.div
    className="flex items-center space-x-4 bg-gray-800 p-6 rounded-lg shadow-md"
    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
  >
    <div className="p-3 bg-gray-700 rounded-full relative">
      <Icon className="w-8 h-8 text-indigo-400" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </motion.div>
);

const ServerCard = ({
  title,
  description,
  members,
  image,
  gradient,
  borderColor,
  link, // Added 'link' prop for the server join link
}) => (
  <motion.div
    className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-xs w-full mx-auto" // Max width for centering
    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
  >
    {/* Pulsing Border Animation */}
    <motion.div
      className="absolute inset-0 rounded-lg border-4"
      style={{ borderColor: borderColor }}
      animate={{
        opacity: [0.5, 0.1],
        scale: [1, 1.1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    <div className="h-32 bg-gray-700 relative">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg" // Image inside the card with proper fit
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No Image
        </div>
      )}
    </div>
    <div className="p-4 relative z-10">
      <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
      <p className="text-sm text-gray-400 truncate mb-3">{description}</p>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <UsersIcon className="w-5 h-5 text-gray-400 mr-1" />
        {members} Members
      </div>
      {/* Updated the button to be a link */}
      <a
        href={link} // Link to the Discord server or external page
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold shadow-md hover:opacity-90 hover:scale-105 transition-all duration-300 focus:outline-none text-center"
      >
        Join Server
      </a>
    </div>
  </motion.div>
);

const ServersSection = () => {
  const [servers, setServers] = useState([
    {
      title: "Vouchley",
      description: "The review platform for freelancers.",
      members: "1,024", // Initially set member count
      image:
        "https://media.discordapp.net/attachments/1191770977474969680/1322256446309798012/Frame_151.jpg?ex=677036c7&is=676ee547&hm=6e82969d26e5a4801a1cdea38b783b33e7750990ba9605e948b388c1b11a9fe0&=&format=webp&width=2160&height=502",
      gradient: "bg-gradient-to-r from-green-500 to-teal-500",
      borderColor: "rgba(34, 197, 94, 0.5)", // Green
      link: "https://discord.gg/ts2s8PAF8C", // Link to the server
    },
    {
      title: "Rollerite",
      description: "Your Vision. Our Services. Limitless Soultions.",
      members: "732",
      image:
        "https://media.discordapp.net/attachments/1168713990118047904/1211070150007197767/Grand-Release.png?ex=676f2378&is=676dd1f8&hm=ebee5954f81d0ae2eb4c314d22439223147da988eefa83716a35bac6cd58f757&=&format=webp&quality=lossless&width=2024&height=1012",
      gradient: "bg-gradient-to-r from-pink-500 to-purple-500",
      borderColor: "rgba(236, 72, 153, 0.5)", // Pink
      link: "https://discord.gg/rollerite", // Link to the server
    },
    {
      title: "PaletteBloom",
      description: "Create stunning color palettes for your next design.",
      members: "550",
      image: "https://pbs.twimg.com/profile_banners/1863591164034846720/1735034165/1500x500",
      gradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
      borderColor: "rgba(56, 189, 248, 0.5)", // Blue
      link: "https://discord.gg/techenthusiasts", // Link to the server
    },
  ]);

  // Simulating API call to update user count
  const updateUserCount = (index) => {
    const updatedServers = [...servers];
    updatedServers[index].members = Math.floor(Math.random() * 1000) + 500; // Simulating random user count
    setServers(updatedServers);
  };

  // Fetching user count every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      servers.forEach((server, index) => {
        updateUserCount(index);
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Cleanup the interval when component unmounts
  }, [servers]);

  return (
    <div className="bg-gray-900 text-white py-16 flex flex-col items-center">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-3xl font-bold text-center mb-8">Why Join Us?</h1>
        <div className="flex justify-center flex-wrap gap-6 mb-16">
          <FeatureCard
            title="Thriving Communities"
            description="Find servers that match your interests and connect with like-minded individuals."
            Icon={UsersIcon}
          />
          <FeatureCard
            title="Engaging Activities"
            description="Participate in exciting events, discussions, and more."
            Icon={SparklesIcon}
          />
          <FeatureCard
            title="Safe Spaces"
            description="Enjoy moderated servers that prioritize safety and respect."
            Icon={ShieldCheckIcon}
          />
          <FeatureCard
            title="Global Reach"
            description="Connect with members from all over the world."
            Icon={GlobeAltIcon}
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">Featured Discord Servers</h1>
        <p className="text-gray-400 text-center mb-10">
          Browse thousands of the best Discord Servers and find your next community.
        </p>
        {/* Centering the server cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {servers.map((server, index) => (
              <ServerCard
                key={index}
                title={server.title}
                description={server.description}
                members={server.members}
                image={server.image}
                gradient={server.gradient}
                borderColor={server.borderColor}
                link={server.link} // Pass the link prop to the ServerCard
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServersSection;
