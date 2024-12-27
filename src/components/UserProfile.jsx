import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/auth/user", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not authenticated");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error(err);
        window.location.href = "/"; // Redirect to home if user is not authenticated
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <img
        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
        alt="Avatar"
      />
    </div>
  );
};

export default UserProfile;
