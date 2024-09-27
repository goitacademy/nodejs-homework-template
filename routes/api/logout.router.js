const express = require("express");
const logout = express.Router();
const User = require("../../model/user.model");

logout.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.token = null;
    await user.save();

    res.status(200).json({ message: "User successfully logged out" });
  } catch (error) {
    console.error("Error during user logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = logout;
