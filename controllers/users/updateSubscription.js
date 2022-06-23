const createError = require("http-errors");
const { User } = require("../../models");

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
      }
    );
    console.log(result);
    if (!result) {
      throw createError(404, `User with id=${_id} not found`);
    }
    res.json({
      message: " subscription update",
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
