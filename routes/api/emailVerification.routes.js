const express = require("express");
const router = express.Router();
const User = require("../../models/user.schema");
const { sendVerificationEmail } = require("../../utils/email");

router.post("/resend", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing required field email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const newVerificationToken = crypto.randomBytes(16).toString("hex");
    user.verificationToken = newVerificationToken;
    await user.save();

    await sendVerificationEmail(user, newVerificationToken);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
