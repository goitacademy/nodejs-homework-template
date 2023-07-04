const { User } = require("../../models/user/user");

const { emailSender } = require("../../Helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "Email not found" });
    return;
  }
  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
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
