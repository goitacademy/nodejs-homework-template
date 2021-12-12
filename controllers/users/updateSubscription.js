const { User } = require('../../models');
const { NotFound } = require('http-errors');

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const result = await User.findOneAndUpdate({ _id }, { subscription }, { new: true });

  if (!result) {
    throw new NotFound(`Contact with ID=${userId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'subscription updeted',
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = updateSubscription;
