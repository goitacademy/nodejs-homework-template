const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `user ${_id} not found`);
  }
  res.status(200).json(result);
};

module.exports = updateSubscription;
