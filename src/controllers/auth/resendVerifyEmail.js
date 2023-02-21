const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { NotFound } = require("http-errors");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound();
  }
  if (!email) {
    return res.status(400).json({
      message: "missing required field email",
    });
  } else if (user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href="http://localhost:8080/api/users/verify/${user.verificationToken}">Confirm email</a>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    message: "Verification email sent",
  });
};
module.exports = { resendVerifyEmail };
