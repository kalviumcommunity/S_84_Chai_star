const express = require("express");
const Chai = require("../models/chaiwalasModel"); // ✅ Fixed model import

const router = express.Router();

// ✅ Get all chaiwalas
router.get("/chaiwalas", async (req, res) => {
  try {
    const chaiwalas = await Chai.find();
    if (!chaiwalas.length) {
      return res.status(404).json({ success: false, message: "No chaiwalas found." });
    }

    res.status(200).json({ success: true, count: chaiwalas.length, data: chaiwalas });
  } catch (error) {
    console.error("Error fetching chaiwalas:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ✅ Get a single chaiwala by ID
router.get("/chaiwalas/:id", async (req, res) => {
  try {
    const chaiwala = await Chai.findById(req.params.id);
    if (!chaiwala) {
      return res.status(404).json({ success: false, message: "Chaiwala not found" });
    }

    res.status(200).json({ success: true, data: chaiwala });
  } catch (error) {
    console.error("Error fetching chaiwala:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ✅ Add a new chaiwala
router.post("/chaiwalas", async (req, res) => {
  try {
    const { name, location, rating, image } = req.body;
    if (!name || !location || rating === undefined) {
      return res.status(400).json({ success: false, message: "Name, location, and rating are required" });
    }

    const newChaiwala = new Chai({ name, location, rating, image });
    await newChaiwala.save();

    res.status(201).json({ success: true, message: "Chaiwala added successfully", data: newChaiwala });
  } catch (error) {
    console.error("Error adding chaiwala:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ✅ Update a chaiwala (PUT)
router.put("/chaiwalas/:id", async (req, res) => {
  try {
    const { name, location, rating, image } = req.body;
    
    const updatedChaiwala = await Chai.findByIdAndUpdate(
      req.params.id,
      { name, location, rating, image },
      { new: true, runValidators: true }
    );

    if (!updatedChaiwala) {
      return res.status(404).json({ success: false, message: "Chaiwala not found" });
    }

    res.status(200).json({ success: true, message: "Chaiwala updated successfully", data: updatedChaiwala });
  } catch (error) {
    console.error("Error updating chaiwala:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ✅ Delete a chaiwala
router.delete("/chaiwalas/:id", async (req, res) => {
  try {
    const deletedChaiwala = await Chai.findByIdAndDelete(req.params.id);
    if (!deletedChaiwala) {
      return res.status(404).json({ success: false, message: "Chaiwala not found" });
    }

    res.status(200).json({ success: true, message: "Chaiwala deleted successfully" });
  } catch (error) {
    console.error("Error deleting chaiwala:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
