const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String },
  qrPayload:   { type: String },          
});

module.exports = mongoose.model("Location", locationSchema);