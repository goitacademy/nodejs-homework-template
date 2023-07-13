const { User } = require('../../models/user');

const { HttpError } = require('../../helpers');

const updateSubscriptionUser = async (req, res) => {
  const { _id } = req.user;
  const updatingUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!updatingUser) {
    throw HttpError(404, 'Not found');
  }
  res.json(updatingUser);
};

module.exports = updateSubscriptionUser;