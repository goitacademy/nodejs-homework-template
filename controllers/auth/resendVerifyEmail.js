const { User } = require("../../models/user");
const { BadRequest } = require("http-errors");
const { sendEmail } = require("../../routes/api/helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound();
  }
  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}>Verificate your email</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Email verify resend",
  });
};

module.exports = resendVerifyEmail;
