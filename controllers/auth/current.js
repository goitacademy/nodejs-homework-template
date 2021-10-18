const { Unauthorized } = require('http-errors');
const { User } = require('../../model/user');

const current = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id });
  if (!user) {
    throw new Unauthorized('Not authorized')
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

module.exports = current;
