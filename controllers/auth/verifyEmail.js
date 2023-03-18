const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const verifyEmail = async (req, res) => {
  console.log('blip');
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(401, 'no email');
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
  res.json({
    message: 'verifyed!',
  });
};

module.exports = verifyEmail;
