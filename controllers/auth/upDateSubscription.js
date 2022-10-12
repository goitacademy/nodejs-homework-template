const { User } = require('../../models/users');

const { RequestError } = require('../../helpers');

const upDateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const user = await User.updateOne({ _id }, { $set: { subscription } });

  if (!user) {
    throw RequestError(401, 'Not authorized');
  }
  res.status(200).json({ status: 'success' });
};

module.exports = upDateSubscription;
