const express = require("express");
const router = express.Router();
const rechargeController = require("../controllers/rechargeController");

router.post("/recharge", rechargeController.createRecharge); 
router.get("/recharge", rechargeController.getAllRecharges); 
//router.delete("/:id", rechargeController.getAllRecharges); 

module.exports = router;
