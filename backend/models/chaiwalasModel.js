const mongoose = require("mongoose");

const chaiwalaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 }, // Enforce rating limits (0-5)
  image: { type: String, default: "https://via.placeholder.com/150" }, // Default image if none provided
  created_by: { type: String, required: true }
}, { 
  timestamps: true, 
  collection: "chaiwalas" // Explicit collection name (optional)
});
const Chaiwala = mongoose.model("Chaiwala", chaiwalaSchema)
module.exports = Chaiwala;