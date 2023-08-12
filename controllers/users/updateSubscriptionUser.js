const { User } = require("../../models");
const { contactSubscriptionSchema } = require("../../schemas");

const updateSubscriptionUser = async (req, res, next) => {
  try {
    const { error } = contactSubscriptionSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field subscription",
      });
      return;
    }
    const { _id, email, token } = req.user;
    const { subscription } = req.body;
    await User.findByIdAndUpdate(_id, { subscription });
    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscriptionUser;
