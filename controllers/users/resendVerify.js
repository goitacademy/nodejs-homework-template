const { User, schemas } = require("../../models/user");
const { RequestError, sendMail, createVerifyEmail } = require("../../helpers");

const resendVerify = async (req, res) => {
  const { error } = schemas.verifySchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, "Email not found");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerify;
