const createError = require("http-errors");
const { authServices } = require("../../services");

const updateSubscription = async (req, res, next) => {
  const { userId, subscription } = req.body;
  const updatedUser = await authServices.updateSubscription(userId, {
    subscription,
  });
  if (!updatedUser) throw createError(404, `User with ${userId} id not found`);
  res.status(200).json({
    status: "success",
    code: "200",
    payload: { result: updatedUser },
  });
};

module.exports = updateSubscription;
