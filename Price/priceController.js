const Price = require("./priceSchema");

// Get all prices
const getPrices = async (req, res) => {
  try {
    const prices = await Price.find();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch prices: ${error.message}` });
  }
};

// Add a new price
const addPrice = async (req, res) => {
  try {
    const price = new Price(req.body);
    const savedPrice = await price.save();
    res.status(201).json(savedPrice);
  } catch (error) {
    res.status(400).json({ message: `Failed to add price: ${error.message}` });
  }
};

// Update price status (toggle)
const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the price by ID
    const price = await Price.findById(id);
    if (!price) {
      return res.status(404).json({ message: "Price not found" });
    }

    // Toggle the status
    price.status = price.status === "Active" ? "Inactive" : "Active";
    const updatedPrice = await price.save();

    res.status(200).json(updatedPrice);
  } catch (error) {
    res.status(400).json({ message: `Failed to update status: ${error.message}` });
  }
};

// Delete a price
const deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPrice = await Price.findByIdAndDelete(id);
    if (!deletedPrice) {
      return res.status(404).json({ message: "Price not found" });
    }
    res.status(200).json({ message: "Price deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Failed to delete price: ${error.message}` });
  }
};

module.exports = {
  getPrices,
  addPrice,
  updatePrice,
  deletePrice,
};
