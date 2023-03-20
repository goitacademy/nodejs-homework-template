const { HttpError, sendEmail } = require('../../helpers');
const { User } = require('../../models/user');
require('dotenv').config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'email n ot found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }
  const verifyEmail = {
    to: email,
    subject: 'verification',
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" >click to verify</a>`,
  };
  await sendEmail(verifyEmail);
  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;
