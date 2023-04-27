const User = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateSubscriptionUser = async (req, res) => {
  const { userId } = req.params;

  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateSubscriptionUser;
