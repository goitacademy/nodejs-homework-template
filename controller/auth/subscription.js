const { RequestError } = require("../../helpers");
const User = require("../../service/schemas/user/users");
const service = require("../../service/schemas/user");
const { subscriptionUserSchema } = require("../../validationSchemas/users");
const updateSubscription = async (req, res, next) => {
  try {
    const { error } = subscriptionUserSchema.validate(req.body);
    if (error) {
      throw RequestError(
        400,
        "No user Id or Subscription type. Subscription should be one of 'Starter', 'Pro' or 'Business"
      );
    }
    const { user } = req;
    console.log(req.body.subscription);
    await service.updateSubscription(user._id, req.body.subscription.toLowerCase());
    const result=await User.findById({ _id: user.id });
    res
      .status(200)
      .json({
        message: { email: result.email, subscription: result.subscription },
      });
  } catch (error) {
    next(error);
  }
};
module.exports = updateSubscription;
