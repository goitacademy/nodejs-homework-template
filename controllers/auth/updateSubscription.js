const { User } = require("../../models");
const { subscriptionJoiSchema } = require("../../models/users");

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const subscription = req.body.subscription;

    if (!subscription) {
      res.status(400).json({
        message: "missing field subscription",
      });
    }

    const { error } = subscriptionJoiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const updateSubscription = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    if (!updateSubscription) {
      const error = new Error(`Contact with this id: ${_id} is not found`);
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      result: updateSubscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
