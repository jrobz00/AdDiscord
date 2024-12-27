import React, { createContext, useState, useEffect } from "react";

// Create Context
export const ServersContext = createContext();

// Context Provider Component
export const ServersProvider = ({ children }) => {
  const [servers, setServers] = useState(() => {
    const savedServers = localStorage.getItem("servers");
    return savedServers ? JSON.parse(savedServers) : [];
  });

  useEffect(() => {
    // Save servers to localStorage whenever servers state changes
    localStorage.setItem("servers", JSON.stringify(servers));
  }, [servers]);

  const addServer = (server) => {
    setServers((prev) => [...prev, server]);
  };

  return (
    <ServersContext.Provider value={{ servers, addServer }}>
      {children}
    </ServersContext.Provider>
  );
};

export default ServersProvider;
