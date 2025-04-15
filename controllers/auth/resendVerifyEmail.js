const { User } = require("../../models/user");
const { sendMail, customError } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    const error = new Error("User not faund");
    error.status = 404;
    throw error;
  }
  if (user.verify) {
    throw customError("Verification has already been passed", 400);
  }
  const mail = {
    to: email,
    subject: " Email`s verify",
    html: `<a target='_blank' href='http://localhost:3000/api/auth/verify/${user.verificationToken}' >Go to verify email</a>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
