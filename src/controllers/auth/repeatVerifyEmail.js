const { User } = require("../../models");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const repeatVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const verificationToken = v4();
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
    html: `<a target="_blank" href="http://localhost:8080/api/users/verify/${verificationToken}">Confirm email</a>`,
  };
  res.status(200).json({
    message: "Verification email sent",
  });

  await sendEmail(mail);
};
module.exports = { repeatVerifyEmail };
