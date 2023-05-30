const asyncHandler = require("express-async-handler");
const { UserServices } = require("../../services");
const { HttpError } = require("../../helpers");
const { subscriptionSchema } = require("../../schemas");

const updateSubscription = asyncHandler(async (req, res) => {
  const { _id: id } = req.user;
  const { subscription: newSubscriptionPlan } = req.body;
  if (!newSubscriptionPlan) {
    throw HttpError(400, "provide all required fields");
  }
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Unable to update subscription");
  }

  const subsTypes = ["starter", "pro", "business"];
  const isValidType = subsTypes.indexOf(newSubscriptionPlan);

  if (isValidType === -1) {
    throw HttpError(400, "Unable to update subscription");
  }

  const result = await UserServices.updateSubscriptionPlan(
    id,
    newSubscriptionPlan
  );
  if (!result) {
    throw HttpError(404, "Unable to update subscription");
  }

  res.status(200).json({
    status: 200,
    message: "Subscription plan updated",
    data: { email: result.email, subscription: result.subscription },
  });
});

module.exports = updateSubscription;
