const { User } = require("../../models/user");
const { subscriptionSchema } = require("../../models/user");
const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    error.message = "missing or wrong field subscription";
    error.status = 400;
    throw error;
  }
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "updated success",
    data: {
      result: updatedUser,
    },
  });
};

module.exports = updateSubscription;