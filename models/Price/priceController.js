const Price = require("../models/Price");

const getPrices = async (req, res) => {
  try {
    const prices = await Price.find();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prices" });
  }
};


const addPrice = async (req, res) => {
  try {
    const price = new Price(req.body);
    const savedPrice = await price.save();
    res.status(201).json(savedPrice);
  } catch (error) {
    res.status(400).json({ message: "Failed to add price" });
  }
};

const deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPrice = await Price.findByIdAndDelete(id);

    if (!deletedPrice) {
      return res.status(404).json({ message: "Price not found" });
    }

    res.status(200).json({ message: "Price deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete price" });
  }
};

module.exports = {
  getPrices,
  addPrice,
  deletePrice,
};
