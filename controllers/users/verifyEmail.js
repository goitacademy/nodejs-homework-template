const { User } = require('../../models');
const { httpError } = require('../../utils');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw httpError(404);
  }

  user.verificationToken = null;
  user.verified = true;
  await user.save();

  res.json({
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
