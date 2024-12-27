import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  // Safely access error properties and provide defaults
  const errorMessage =
    error?.statusText || error?.message || "An unexpected error occurred.";

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-lg mb-4">Sorry, something went wrong.</p>
      <p className="text-sm text-gray-400">
        <i>{errorMessage}</i>
      </p>
      <a
        href="/"
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;
