import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ServersProvider from "./context/ServersContext";

ReactDOM.render(
  <React.StrictMode>
    <ServersProvider>
      <App />
    </ServersProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
