const { User } = require('../../models');
var { NotFound } = require('http-errors');

const updateSubscription = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  const { subscription } = req.body;
  console.log(req);

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
