const { User } = require('../../models');
const { httpError } = require('../../utils');
const { sendEmail } = require('../../utils');

const sendVerificationMail = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(404);
  }

  if (user.verified) {
    res.status(400).json({ message: 'User already verified' });
  }

  sendEmail(
    user.email,
    `Please visit link to verify your email http://localhost:3000/api/users/verify/${user.verificationToken}`
  );

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = sendVerificationMail;
