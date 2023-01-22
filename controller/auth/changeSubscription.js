const subscriptionSchema = require("../../schemas/Joi/subscriptionSchema");
const { BadRequest } = require("http-errors");
const Auth = require("../../models/auth");

const changeSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = subscriptionSchema.validate(req.body);

    if (error) {
      throw next(BadRequest(error.message));
    }

    const updatedUser = await Auth.findOneAndUpdate({ _id: _id }, req.body, {
      new: true,
    });

    res.json({
      user: {
        email: updatedUser.email,
        subscription: updatedUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = changeSubscription;
