const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Price", priceSchema);
