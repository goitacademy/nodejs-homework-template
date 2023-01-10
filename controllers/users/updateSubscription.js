const { User } = require('../../models');
const { httpError } = require('../../utils');

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404);
  }
  res.json(result);
};

module.exports = updateSubscription;
