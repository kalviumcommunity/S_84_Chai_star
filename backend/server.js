require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const chaiwalaRoutes = require("./routes/chaiwalasRoutes"); // Import routes

const app = express(); // Define app BEFORE using it
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Allows reading JSON data in requests

app.use(cors({
  origin: [
    'https://chai-star-asap.pages.dev', // Local frontend
    'https://fa4eff9e.chai-star-asap.pages.dev' // Deployed frontend
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected successfully"))
.catch((error) => console.error("Database connection failed:", error.message));

// Use Routes
app.use("/api", chaiwalaRoutes); // All API routes will be prefixed with /api

// Default Route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Chaiwala Ranking API</h1>");
});

// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
