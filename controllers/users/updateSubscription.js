const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const successRes = require("../../utils/successRes");

async function updateSubscription(req, res, next) {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;

    const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

    if (!user) {
      throw new Unauthorized("Not authorized");
    }

    res.json(
      successRes({
        email: user.email,
        subscription: user.subscription,
      })
    );
  } catch (error) {
    next(error);
  }
}

module.exports = updateSubscription;
