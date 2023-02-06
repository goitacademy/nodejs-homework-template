const { User } = require("../../models");
const createError = require("http-errors");

const updateSubscription = async (req, res, next) => {
  try {
    const { _id, subscription } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    const subList = ["pro", "starter", "business"];

    if (!subList.some((elem) => elem === subscription)) {
      throw createError(
        400,
        "Subscription must be one of [pro, starter, business]"
      );
    }

    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "Success",
      code: 200,
      message: "contact updated",
      data: { _id, subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;