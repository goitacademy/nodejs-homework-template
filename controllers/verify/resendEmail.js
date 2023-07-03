const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../utils");

require("dotenv").config();

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({email});
  if (!user) {
    throw HttpError(400, "Missing required field email");
  }
  if (user.verify) {
    throw HttpError(401, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "The letter is resent",
  });
};

module.exports = resendEmail;
