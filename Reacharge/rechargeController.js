const Recharge = require("./rechargeSchema");


exports.createRecharge = async (req, res) => {
  const { paymentMethod, amount, trxId, uid, name, number } = req.body;

  if (!paymentMethod || !amount || !trxId || !uid || !name || !number) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (amount < 20) {
    return res.status(400).json({ message: "Minimum recharge is 20 BDT." });
  }

  try {

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
      number,
    });
    await newRecharge.save();

    res.status(201).json({ message: "Recharge successful!" });
  } catch (error) {
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
