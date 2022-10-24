const { User } = require("../../service/schemasAuth");

const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, "Email not found");
  }
  if (user.verify || user.verificationToken === "") {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    code: 200,
    status: "success",
    message: "Verification email sent",
  });
};

module.exports = resendVerify;
