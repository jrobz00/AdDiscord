import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/Hero";
import AddServerPage from "./components/AddServerPage";
import ServersSection from "./components/ServersSection";
import DashboardPage from "./components/DashboardPage";
import PremiumPage from "./components/PremiumPage";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import ErrorPage from "./components/ErrorPage"; // Error Page
import Register from "./components/Register"; // Register Page
import Login from "./components/Login"; // Login Page
import SearchDirectory from "./components/SearchDirectory"; // Search Directory Page

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Hero />
        <ServersSection />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/add-server",
    element: (
      <div>
        <AddServerPage />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <div>
        <DashboardPage />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/premium",
    element: (
      <div>
        <PremiumPage />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <div>
        <UserProfile />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/search", // Search Directory Route
    element: (
      <div>
        <SearchDirectory />
        <Footer />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*", // Catch-all for undefined paths
    element: <ErrorPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
