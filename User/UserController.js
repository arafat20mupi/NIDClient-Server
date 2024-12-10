const admin = require("firebase-admin");
const User = require("./UserSchema");


// Register User
exports.register = async (req, res) => {
  const { name, phone, password } = req.body;
  try {
    const firebaseUser = await admin.auth().createUser({
      phone: phone,
      password: password,
    });

    const user = new User({
      name,
      phone,
      password,
      firebaseUid: firebaseUser.uid,
    });
    await user.save();
    console.log(phone,name);
    res.status(200).send("User is registered");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });

    if (!user) return res.status(400).send("User not found");

    const isMatch = await user.comparePassword(password);

    if (!isMatch) return res.status(400).send("Invalid credentials");

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    // Firebase theke users niye asha
    const listUsersResult = await admin.auth().listUsers();
    const firebaseUsers = listUsersResult.users; // Firebase er users array

    // MongoDB theke users niye asha
    let dbUsers = [];
    try {
      dbUsers = await User.find(); // User hocche apnar MongoDB user model
    } catch (dbError) {
      console.error("Database error:", dbError);
    }

    // Firebase ebong MongoDB users ke ek sathe response er maddhome pathano
    res.status(200).json({ firebaseUsers, dbUsers });
  } catch (error) {
    console.error("Firebase user error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Check Admin Status// Check Admin Status// Check Admin Status
exports.checkAdmin = async (req, res) => {
  const { uid } = req.params;

  if (!uid || typeof uid !== "string" || uid.length === 0) {
    return res.status(400).json({ error: "Invalid UID provided" });
  }

  try {
    const userRecord = await admin.auth().getUser(uid);
    const isAdmin =
      userRecord.customClaims && userRecord.customClaims.role === "admin";

    res.status(200).json({ isAdmin });
  } catch (error) {
    console.error("Error checking admin status:", error);

    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { uid } = req.params; // Get the Firebase UID from the request parameters

  try {
    // Delete the user directly from Firebase
    await admin.auth().deleteUser(uid);

    res.status(200).send("User deleted successfully from Firebase");
  } catch (error) {
    console.error("Error deleting user from Firebase:", error);
    res.status(500).json({ error: error.message });
  }
};

// Change User Role
exports.changeUserRole = async (req, res) => {
  const { phone, role } = req.body;
  try {
    // Find Firebase user by phone
    const userRecord = await admin.auth().getUserByphone(phone);
    const uid = userRecord.uid;

    // Set custom claims for the user
    await admin.auth().setCustomUserClaims(uid, { role });

    // Optionally, update your local DB if needed
    await User.findOneAndUpdate({ firebaseUid: uid }, { role }, { new: true });

    // Respond with JSON instead of a plain string
    res.status(200).json({ message: `User role changed to ${role}` });
  } catch (error) {
    // Log the error for debugging
    console.error("Error changing user role:", error);

    // Respond with an error message in JSON format
    res.status(500).json({ error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { uid } = req.params; // Get the Firebase UID from the request parameters
  const updateData = req.body; // Get the updated data from the request body

  try {
    // Prepare the data for Firebase update
    const firebaseUpdates = {};

    // Only include fields that are present in the request body
    if (updateData.phone) firebaseUpdates.phone = updateData.phone;
    if (updateData.displayName)
      firebaseUpdates.displayName = updateData.displayName;

    // Update user in Firebase if there are fields to update
    const updatedUser = await admin.auth().updateUser(uid, firebaseUpdates);

    // Update user in MongoDB
    const updatedDBUser = await User.findOneAndUpdate(
      { firebaseUid: uid },
      { ...updateData }, // Update with all fields provided
      { new: true }
    );
    res.status(200).json({
      message: "User updated successfully",
      firebaseUser: updatedUser,
      dbUser: updatedDBUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};
