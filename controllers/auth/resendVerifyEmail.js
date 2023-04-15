const User = require("../../models/userModel");
const sendVerifyEmail = require("../../services/emailServices");
const { AppError } = require("../../utils");

const resendVerifyEmail = async (req, res, next) => {
  console.log(req.body)
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  if (user.verify) {
    return next(new AppError(400, "User already verify"));
  }

  const letter = {
    to: email,
    subject: "Підтвердження регістрації на сайті",
    html: `<a href='http://localhost:3000/api/users/verify/${user.verificationToken}' target='_blank'>Натисніть для пітдвердження регістрації'</a>`,
  };

  await sendVerifyEmail(letter);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Email verify resend",
  });
};

module.exports = resendVerifyEmail;