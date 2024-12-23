const Recharge = require("./rechargeSchema");
const User = require("../User/UserSchema");

exports.createRecharge = async (req, res) => {
  const { paymentMethod, amount, trxId, userId, name, number } = req.body;

  // Check if all required fields are present
  if (!paymentMethod || !amount || !trxId || !userId || !name || !number) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check for minimum recharge amount
  if (amount < 20) {
    return res.status(400).json({ message: "Minimum recharge is 20 BDT." });
  }

  try {
    // Check if the transaction ID already exists
    const existingRecharge = await Recharge.findOne({ trxId });
    if (existingRecharge) {
      return res.status(400).json({ message: "TrxId already exists." });
    }

    // Save the recharge to the database
    const newRecharge = new Recharge({
      paymentMethod,
      amount,
      trxId,
      userId,
      name,
      number,
    });

    await newRecharge.save();

    // Return a success response
    res.status(201).json({ message: "Recharge successful!" });
  } catch (error) {
    // Handle server errors
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};




exports.getAllRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find();
    res.status(200).json(recharges);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve recharges." });
  }
};


exports.updateRechargeStatus = async (req, res) => {
  const { trxId } = req.params;
  const { amount } = req.body; 

  console.log( trxId , amount);
  try {
    const recharge = await Recharge.findOne({ trxId });

    if (!recharge) {
      return res.status(404).json({ message: "Recharge transaction not found" });
    }

    recharge.status = 'success';
    await recharge.save();

    const user = await User.findOne( { _id: recharge.userId } ); 
    if (user) {
      user.balance += amount; 
      await user.save();
    }
 
    res.status(200).json({
      message: "Recharge approved and amount added to user's balance",
      recharge,
      user,
    });
  } catch (error) {
    console.error("Error updating recharge status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
