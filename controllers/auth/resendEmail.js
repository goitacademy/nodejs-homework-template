const createVerifyEmail = require("../../helpers/createVerifyEmail");
const RequestError = require("../../helpers/RequestError");
const sendEmail = require("../../helpers/sendEmail");
const User = require("../../models/auth");

const resendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw RequestError(400, "missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, "Wrong email");
  }
  const { verificationToken } = user;
  if (user.verificationToken === null) {
    throw RequestError(400, "Verification has already been passed");
  }
  const emailToSend = createVerifyEmail(email, verificationToken);
  try {
    await sendEmail(emailToSend);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    throw RequestError(400, error.message);
  }
};

module.exports = resendEmail;
