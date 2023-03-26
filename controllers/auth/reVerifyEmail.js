const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");

const { PORT = 3000 } = process.env;

const reVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw RequestError(404, `User not found`);
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const { verificationToken } = user;
  const msg = {
    to: email,
    subject: "The mail confirmation",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}">To confirm email!</a>`,
  };
  await sendEmail(msg);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = reVerifyEmail;