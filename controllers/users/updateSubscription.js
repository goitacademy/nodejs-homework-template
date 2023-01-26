const {
  userSubscriptionSchema,
} = require("../../schemas/validationSchemaUser.js");
const { User } = require("../../models/user.js");
const { RequestError } = require("../../helpers/index.js");

async function updateSubscription(req, res, next) {
  try {
    const { subscription } = req.body;
    const { _id } = req.user;
    const validationResult = userSubscriptionSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    if (!user) {
      throw RequestError(401, "Not authorized");
    }

    res.json({ subscription: user.subscription });
  } catch (error) {
    next(error);
  }
}

module.exports = { updateSubscription };
