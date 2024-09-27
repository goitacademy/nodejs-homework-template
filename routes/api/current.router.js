const express = require("express");
const current = express.Router();
const User = require("../../model/user.model");
const tokenMiddleware = require("../../middleware/tokenMiddleware");

current.get("/", tokenMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: currentUser.email,
      subscription: currentUser.subscription,
    });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

current.patch("/subscription", tokenMiddleware, async (req, res) => {
  const { subscription } = req.body;

  if (!subscription) {
    return res.status(400).json({ message: "Missing subscription field" });
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

module.exports = current;
