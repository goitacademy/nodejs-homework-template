const { auth } = require('../../model');
const { User } = auth;

const current = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findOne({ _id });

  res.json({
    email: result.email,
    subscription: 'starter',
  });
};

module.exports = current;
