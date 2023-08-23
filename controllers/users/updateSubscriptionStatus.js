const User = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateSubscriptionStatus = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).exec();

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateSubscriptionStatus;
