const { User } = require("../../models/user/user");

const { HttpError, emailSender } = require("../../Helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(409, "Email not found");
  }
  if (user.verify) {
    throw HttpError(409, "Email already verify");
  }

  const sendEmailOn = {
    email,
    authKey: user.verificationCode,
  };

  emailSender(sendEmailOn);

  res.json({
    message: "Verify email send success",
  });
};

module.exports = {
  resendVerifyEmail,
};
