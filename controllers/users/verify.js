const { User } = require('../../models/user');
const { NotFound } = require('http-errors');

module.exports = async (req, res) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw NotFound('User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: '',
  });

  res.json({
    Status: '200 OK',
    message: 'Verification successful',
  });
};
