const express = require("express");
const router = express.Router();
const User = require("../../models/user.schema");

router.get("/verify/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
