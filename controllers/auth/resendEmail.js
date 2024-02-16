const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "User not found");
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(mail);

  res.json({ message: "Verification email sent" });
};

module.exports = resendEmail;
