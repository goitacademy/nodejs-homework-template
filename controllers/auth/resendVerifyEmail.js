const { User } = require("../../models/user");

const { HttpErr, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpErr(400);
  }
  if (user.verify) {
    throw HttpErr(401, "Verification has already  been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank"href="${BASE_URL}/api/users/verify/${user.verificationToken}" >Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    message: "Verify email sent",
  });
};

module.exports = resendVerifyEmail;
