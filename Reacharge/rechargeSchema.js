const mongoose = require("mongoose");

const rechargeSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bkash", "nogod", "rocket"],
    },
    number: {
      type: String,
      required: true,
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
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status:{
      type: String,
      enum: ["pending", "success", "cencel"],
      default: "pending"
    }
  }, 
  { timestamps: true }
);

module.exports = mongoose.model("Recharge", rechargeSchema);
