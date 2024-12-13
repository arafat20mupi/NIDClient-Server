const express = require("express");
const {
  getPrices,
  addPrice,
  deletePrice,
} = require("./priceController");

const router = express.Router();

router.get("/getPrice", getPrices);
router.post("/price", addPrice);

router.delete("/:id", deletePrice);

module.exports = router;
