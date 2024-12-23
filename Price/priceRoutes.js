const express = require("express");
const {
  getPrices,
  addPrice,
  deletePrice,
  updatePrice
} = require("./priceController");


const router = express.Router();

router.get("/getPrice", getPrices);
router.post("/price", addPrice);

router.delete("/:id", deletePrice);

router.put("/update/:id", updatePrice);

module.exports = router;
