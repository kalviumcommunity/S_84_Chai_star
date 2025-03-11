const express = require("express");
const router = express.Router();
const Chaiwala = require("./schema");

// GET all chaiwalas
router.get("/chaiwalas", async (req, res) => {
    try {
        const chaiwalas = await Chaiwala.find();
        res.status(200).json(chaiwalas);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chaiwalas", error: error.message });
    }
});

// POST a new chaiwala
router.post("/chaiwalas", async (req, res) => {
    try {
        const { name, description } = req.body;

        // Input validation
        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }

        const newChaiwala = new Chaiwala({ name, description });
        await newChaiwala.save();
        res.status(201).json(newChaiwala);
    } catch (error) {
        res.status(500).json({ message: "Error adding chaiwala", error: error.message });
    }
});

// PUT (Update) a chaiwala by ID
router.put("/chaiwalas/:id", async (req, res) => {
    try {
        const updatedChaiwala = await Chaiwala.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Ensures validation is applied
        );
        if (!updatedChaiwala) {
            return res.status(404).json({ message: "Chaiwala not found" });
        }
        res.status(200).json(updatedChaiwala);
    } catch (error) {
        res.status(500).json({ message: "Error updating chaiwala", error: error.message });
    }
});

// DELETE a chaiwala by ID
router.delete("/chaiwalas/:id", async (req, res) => {
    try {
        const deletedChaiwala = await Chaiwala.findByIdAndDelete(req.params.id);
        if (!deletedChaiwala) {
            return res.status(404).json({ message: "Chaiwala not found" });
        }
        res.status(200).json({ message: "Chaiwala deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting chaiwala", error: error.message });
    }
});

module.exports = router;
