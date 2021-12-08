const { User } = require('../../models');
const { NotFound } = require('http-errors');

const updateSubscription = async (req, res) => {
  const { subscription, userId } = req.body;

  const result = await User.findByIdAndUpdate(userId, { subscription }, { new: true });

  if (!result) {
    throw new NotFound(`Contact with ID=${_id} not found`);
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
