const User = require("../../models/users");
const { HttpError, sendgridEmail } = require("../../helpers");
require("dotenv").config();
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "Missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Confirmation of registration.",
    html: `<p>Hello, follow the link to confirm your registration. </p>
<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  sendgridEmail(verifyEmail);
  res.json({
    message: "Verification email sent",
  });
};
module.exports = resendVerifyEmail;
