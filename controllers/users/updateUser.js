const { User } = require("../../models");
const createError = require("http-errors");

const updateUser = async (req, res) => {
  const hasPropertySubscription = Object.prototype.hasOwnProperty.call(
    req.body,
    "subscription"
  );
  if (!hasPropertySubscription) {
    throw createError(400, "missing field subscription");
  }

  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(200).json({ result });
};

module.exports = updateUser;
