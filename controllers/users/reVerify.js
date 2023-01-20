const { User } = require("../../models");
const { sendEmailBySG } = require("../../helpers");
const { BASE_URL } = process.env;

const reVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Missing required field email" });
    return;
  }
  if (user.verify) {
    res.status(404).json({ message: "Verification has already been passed" });
    return;
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your email address</a>`,
  };
  await sendEmailBySG(verifyEmail);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = reVerify;
