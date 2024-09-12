const User = require('../models/contactModal');
const Email = require('../services/emailService');

const verifyControllerResend = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: 'missing required field email',
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  if (user.verify) {
    return res.status(400).json({
      message: 'Verification has already been passed',
    });
  }

  try {
    const verifyUrl = `http://localhost:3000/users/verify/${user.verificationToken}`;
    await new Email(user, verifyUrl).sendHello();
    res.status(200).json({
      message: 'Verification email sent',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error sending verification email',
    });
  }
};

module.exports = verifyControllerResend;
