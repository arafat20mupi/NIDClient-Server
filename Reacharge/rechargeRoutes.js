const express = require("express");
const router = express.Router();
const {createRecharge , getAllRecharges , updateRechargeStatus} = require("./rechargeController");

router.post("/recharge", createRecharge);
router.get("/recharge", getAllRecharges);

router.put("/recharge/:trxId", updateRechargeStatus);


module.exports = router;
