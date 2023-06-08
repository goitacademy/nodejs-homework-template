const { usersModel } = require("../../models/users");
const { HttpError, sendEmail } = require("../../Helpers");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await usersModel.findOne({ email: email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "user already verified");
  }

  const verificationData = {
    to: email,
    subject: `Verify Email`,
    html: `<a target="_blank" href="${process.env.PROJECT_URL}/api/users/verify/${user.verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verificationData);
  res.json({
    message: "Verify email send",
  });
};

module.exports = resendVerify;
