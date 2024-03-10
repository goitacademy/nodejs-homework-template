const User = require('../models/users');
const generateVerificationToken = require('../helpers/uuid');
const sendVerificationEmail = require('../helpers/mailgun');


exports.resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }
    await sendVerificationEmail(user);
    res.status(200).json({ message: 'Verification email resent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    user.verificationToken = generateVerificationToken();
    await user.save();
    await sendVerificationEmail(user);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.verify(verificationToken, true);
    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};