const express = require("express");
const router = express.Router();
const rechargeController = require("./rechargeController");

router.post("/recharge", rechargeController.createRecharge);
router.get("/recharge", rechargeController.getAllRecharges);

module.exports = router;
