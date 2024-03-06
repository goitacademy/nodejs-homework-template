module.exports = verify;
const { User } = require('../models/users');

async function verify(req, res, reqVerify) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.verificationToken = null;
  user.isVerified = reqVerify; // using the 'reqVerify' parameter here
  await user.save();

  res.status(200).json({ message: 'Verification successful' });
}