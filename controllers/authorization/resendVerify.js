const { User } = require("../../models");
const { HttpErrror, sendEmail } = require("../../helpers");

const resendVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.verify) {
    throw HttpErrror(404, "User not found");
  }
  if (user) {
    throw HttpErrror(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження регістрації на сайті",
    html: `<a href="http://localhost:3000/api/auth//verify/${user.verificationToken}" target="_blank">Натисніть для підтвердження email</a>`,
  };
  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerify;
