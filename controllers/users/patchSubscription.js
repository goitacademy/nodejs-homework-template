const { User } = require('../../models/usersModels');

const patchSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    {
      subscription: subscription,
    },
    {
      new: true,
    }
  );
  if (!subscription) {
    return res.status(400).json({ message: 'missing field subscription' });
  }
  if (!_id) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ result });
};

module.exports = patchSubscription;
