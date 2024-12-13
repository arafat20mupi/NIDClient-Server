const mongoose = require("mongoose");

const rechargeSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bkash", "nogod", "rocket"],
    },
    amount: {
      type: Number,
      required: true,
      min: 20,
    },
    trxId: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recharge", rechargeSchema);
