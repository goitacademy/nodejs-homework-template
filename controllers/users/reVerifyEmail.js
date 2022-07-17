const { createError } = require("../../helpers");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const reSendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(400, "missing required field email");
  }
  if (user.verify === true) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}">Підтвердіть email</a>`,
  };
  await sendEmail(mail);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = reSendVerifyEmail;
