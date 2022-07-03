const { User } = require("../../models");
const sendEmail = require("../../helpers/sendEmail");
const createError = require("http-errors");

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const verificationToken = user.verificationToken;
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const confirmEmail = {
    to: email,
    subject: "Confirm email",
    html: `<p>Follow the link to confirm your email - localhost:3003/api/users/verify/${verificationToken}</p>`,
  };

  await sendEmail(confirmEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;