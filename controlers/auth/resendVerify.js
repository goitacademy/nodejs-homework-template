const { User } = require('../../models/user');
const { createVerifyEmail, sendEmailWithSendGrid } = require('../../service');
const { RequestError } = require('../../helpers');

const resendVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(400, 'Email not found');
  }

  if (user.verify) {
    throw RequestError(400, 'Verification has already been passed');
  }

  const mail = createVerifyEmail(email, user.verificationToken);

  await sendEmailWithSendGrid(mail);

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerify;
