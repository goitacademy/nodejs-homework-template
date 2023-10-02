const { HttpError, sendEmail, verifyEmail } = require("../../helpers");
const { User } = require("../../models/user");

const returnVerifyUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "missing required field email");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail(verifyEmail(email, user.verificationToken));

  res.json({ massage: "Verification email sent" });
};

module.exports = returnVerifyUser;
