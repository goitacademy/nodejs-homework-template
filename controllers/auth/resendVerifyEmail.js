const { User } = require("../../models/user/user");

const { emailSender, HttpError } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
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
