const { User } = require("../../models/User");
const { createError } = require("../../helpers");

const subUpdateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findOneAndUpdate(
      { _id },
      { $set: { subscription } },
      { new: true }
    );
    if (!result) {
      throw createError(404);
    }
    res.json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = subUpdateUser;
