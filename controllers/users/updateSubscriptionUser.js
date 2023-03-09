const User = require("../../models/users");
const { createError } = require("../../helpers");

async function updateSubscription(req, res, next) {
  const { _id, email, subscription } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({
    email,
    subscription,
  });
}

module.exports = updateSubscription;
