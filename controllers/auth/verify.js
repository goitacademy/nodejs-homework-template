const { NotFound } = require('http-errors');
const { User } = require('../../model/user');

const verify = async (req, res) => {
  const { verificationToken } = req.user;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound('User not found')
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      email: user.email,
      subscription: user.subscription
    }

  })
}

module.exports = verify;
