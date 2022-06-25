const createResponse = require("../helpers/createResponse");
const createError = require("../helpers/createError");
const User = require("../models/user");
const { subscriptionSchema } = require("../validation/schema");

async function updateUserSubscription(req, res, next) {
  const { _id } = req.user;
  const { subscription } = req.body;

  try {
    const { error } = subscriptionSchema.validate({ subscription });
    if (error)
      throw createError(400, "missing field subscription or invalid value");

    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    if (!result) throw createError(404);

    createResponse(200, res, result);
  } catch (error) {
    next(error);
  }
}
module.exports = updateUserSubscription;
