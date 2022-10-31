const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    RequestError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.json('Verification successful');
};

module.exports = verify;
