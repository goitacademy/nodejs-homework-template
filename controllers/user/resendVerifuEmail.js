require("dotenv").config();
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { sendEmai } = require("../../middlewares");
const { BASE_URL } = process.env;

const resendVerifuEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    throw HttpError(401, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify Email</a>`,
  };

  await sendEmai(verifyEmail);

  res.status(200).json({
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerifuEmail;
