const { User } = require('../../models/users');
const { RequestError, createVerifyEmail, sendMail } = require('../../helpers'); 

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw RequestError(400, "missing required field email");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = createVerifyEmail(email, user.verificationToken);
  await sendMail(mail);
  res.json({
    message: "Verify email resend"
  })
}

module.exports = resendVerify;