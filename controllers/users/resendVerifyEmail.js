const { User } = require('../../models');
const { ctrlWrapper, httpError, sendEmail } = require('../../utils');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!email) throw httpError(401, 'Email not found');

  if (user.verify) throw httpError(400, 'Verification has already been passed');

  await sendEmail(email, user.verificationToken);

  res.status(200).json({
    message: 'Verification email sent',
  });
};

module.exports = ctrlWrapper(resendVerifyEmail);
