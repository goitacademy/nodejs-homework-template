const express = require("express");
const updateUserSubscription = express.Router();
const User = require("../../model/user.model");

updateUserSubscription.patch("/", async (req, res) => {
  const { subscription } = req.body;

  if (!subscription || !["starter", "pro", "business"].includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription" });
  }

  try {
    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    currentUser.subscription = subscription;
    await currentUser.save();

    res.status(200).json({
      email: currentUser.email,
      subscription: currentUser.subscription,
    });
  } catch (error) {
    console.error("Error updating user subscription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = updateUserSubscription;
