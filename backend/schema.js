const mongoose = require("mongoose");

const chaiwalaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

const Chaiwala = mongoose.model("Chaiwala", chaiwalaSchema);

module.exports = Chaiwala;