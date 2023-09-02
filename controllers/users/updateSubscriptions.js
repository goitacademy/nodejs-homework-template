const users = require("../../models/users.js");
const errorMessage = require("../../helpers/errorMessage.js");

const updateSubscriptions = async (req, res, next) => {
  const { subscription } = req.body;
  try {
    const result = await users
      .findByIdAndUpdate(req.user._id, { subscription }, { new: true })
      .exec();
    if (!result) {
      throw errorMessage(401, "Not authorized");
    }
    res.status(200).json({
      subscription: result.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscriptions;
