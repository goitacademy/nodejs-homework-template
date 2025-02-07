const User = require("../models/user");
const sendEmail = require("./email");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    console.log("Token from URL:", verificationToken);

    const user = await User.findOne({ verificationToken });
    if (!user) {
      console.log("User not found for token:", verificationToken);
      return res.status(404).json({ message: "User not found" });
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

const resendVerificationEmail = async (req, res, next) => {
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

    const verificationLink = `${process.env.BASE_URL}/users/verify/${user.verificationToken}`;

    await sendEmail(
      email,
      "Verify your email",
      `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
    );

    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyEmail,
  resendVerificationEmail,
};
