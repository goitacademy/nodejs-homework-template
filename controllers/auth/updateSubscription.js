const { User, subscriptionSchema } = require("../../models/user");

const { httpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }
  const result = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404);
  }

  res.json(result);
};

module.exports = updateSubscription;
