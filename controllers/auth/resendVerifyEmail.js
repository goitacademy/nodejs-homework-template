const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const { PORT = 3000 } = process.env;

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "Missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
  };
  await sendEmail(mail);

  res.json({
    status: "OK",
    code: 200,
    ResponseBody: {
      message: "Verification email resend",
    },
  });
};

module.exports = resendVerify;