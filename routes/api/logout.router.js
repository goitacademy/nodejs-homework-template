const express = require("express");
const router = express.Router();
const User = require("../../model/user.model");

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.token = null;
    await user.save();

    res.status(204).json({ message: "User successfully logged out" });
  } catch (error) {
    console.error("Error during user logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
