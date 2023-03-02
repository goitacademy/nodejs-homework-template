const { User } = require('../../models');

const setSubscription = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    select: { email: true, subscription: true },
  });
  res.statusMessage('Subscription updated').json({ data: result });
};
module.exports = setSubscription;
