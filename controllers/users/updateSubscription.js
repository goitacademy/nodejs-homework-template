/* eslint-disable no-undef */
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = updateSubscription;
