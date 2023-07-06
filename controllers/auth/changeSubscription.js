const { User } = require('../../models/user');

const { HTTPError } = require('../../helpers');

const changeSubscription = async (req, res) => {
  const { _id } = req.user;

  const validSubscription = ['starter', 'pro', 'business'].includes(
    req.body.subscription
  );

  if (!validSubscription) {
    throw HTTPError(400, 'Subscription with data plan does not exist');
  }

  await User.findByIdAndUpdate(_id, { subscription: req.body.subscription });

  res.status(200).json({
    message: 'Subscription was changed',
  });
};

module.exports = { changeSubscription };
