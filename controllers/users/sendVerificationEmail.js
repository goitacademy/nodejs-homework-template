const { User } = require('../../models');
const { httpError } = require('../../utils');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken: verificationToken });

  if (!user) {
    throw httpError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verified: true,
  });

  res.json({
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
