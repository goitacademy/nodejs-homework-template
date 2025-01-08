const express = require("express");
const User = require("../../../models/User");

const router = express.Router();

router.get("/:verificationToken", async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verify = true;
    user.verificationToken = null;

    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
