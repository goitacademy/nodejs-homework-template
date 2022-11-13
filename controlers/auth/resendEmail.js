const { User } = require("../../models/Users");
const { RequestError, sendMail, createVerifyEmail } = require("../../helpers");
const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404);
  }
  if (user.verify) {
    throw RequestError(400);
  }
  const mail = createVerifyEmail(user.email, user.verificationToken);
  await sendMail(mail);
  res.json({
    message: "Email send",
  });
};
module.exports = resendEmail;
