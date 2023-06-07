const { ctrlWrapper, HttpError, sendEmail } = require('../../helpers');
const User = require('../../models/user');

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, 'User not found');
  if (user.verify) throw HttpError(400, 'Verification has already been passed');

  const verificationEmail = {
    to: email,
    subject: 'Email verification',
    text: 'verification',
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Verify email</a>`,
  };
  await sendEmail(verificationEmail);

  res.json({ message: 'Verification email sent' });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
