const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "test veryfy email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click me</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
