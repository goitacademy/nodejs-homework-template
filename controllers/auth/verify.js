const user = require('../../models/user');
const { HttpError } = require('../../helpers');

const verify = async (req, res) => {
  const { verificationCode } = req.params;

  const findUser = await user.findOne({ verificationCode });
  if (!findUser) {
    throw HttpError(404);
  }

  await user.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: null,
  });

  res.json({
    message: 'email verify success',
  });
};

module.exports = verify;
