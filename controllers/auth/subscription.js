const { BadRequest } = require('http-errors');
const { User } = require('../../model/user');
const subscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!['starter', 'pro', 'business'].includes(subscription)) {
    throw new BadRequest('missing field subscription');
  }
  const result = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );
  res.json({
    message: 'User subscription updated',
    result: { email: result.email, subscription: result.subscription },
  });
};

module.exports = subscription;
