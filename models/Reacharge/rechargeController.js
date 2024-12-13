const Recharge = require("/models/Reacharge");

// Create a new recharge
exports.createRecharge = async (req, res) => {
  const { paymentMethod, amount, trxId, uid, name } = req.body;

  // Validation
  if (!paymentMethod || !amount || !trxId || !uid || !name) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (amount < 20) {
    return res.status(400).json({ message: "Minimum recharge is 20 BDT." });
  }

  try {
    // Check if TrxId is unique
    const existingRecharge = await Recharge.findOne({ trxId });
    if (existingRecharge) {
      return res.status(400).json({ message: "TrxId already exists." });
    }

    // Save recharge to database
    const newRecharge = new Recharge({
      paymentMethod,
      amount,
      trxId,
      uid,
      name,
    });
    await newRecharge.save();

    res.status(201).json({ message: "Recharge successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get all recharges
exports.getAllRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find();
    res.status(200).json(recharges);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve recharges." });
  }
};
