const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription }, { new: true });

  res.status(200).json();
};

module.exports = updateSubscription;
