const { SUBSCRIPTIONS_ENUM } = require('../../constants');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const updateSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  if (
    subscription !== SUBSCRIPTIONS_ENUM.PRO &&
    subscription !== SUBSCRIPTIONS_ENUM.STARTER &&
    subscription !== SUBSCRIPTIONS_ENUM.BUSINESS
  )
    throw HttpError(400);

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(201).json({
    message: 'Subscription successfully updated',
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = updateSubscription;
