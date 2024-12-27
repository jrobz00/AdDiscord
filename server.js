const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Strategy: DiscordStrategy } = require("passport-discord");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend to access backend
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ["identify", "email", "guilds"],
    },
    (accessToken, refreshToken, profile, done) => {
      // You can save the user profile to a database here if needed
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get(
  "/auth/discord",
  passport.authenticate("discord")
);

// Callback route for Discord OAuth2
app.get(
  "/auth/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => {
    // Check if the user object is available
    if (req.isAuthenticated()) {
      console.log("User authenticated:", req.user); // Debugging log
      return res.redirect("http://localhost:3000/profile"); // Redirect to the profile page after successful login
    } else {
      return res.redirect("/"); // Redirect to home if user is not authenticated
    }
  }
);

// Logout route
app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged out successfully!");
  });
});

// Route to get user profile after login
app.get("/auth/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(req.user); // Send user profile to frontend
});

// Start the server
const PORT = process.env.PORT || 3001; // Use port 3001 for the backend
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
