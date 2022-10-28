const createError = require("http-errors");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404, "missing field");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = updateSubscription;
