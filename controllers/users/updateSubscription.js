const { findUserAndUpdate } = require("../../services/users");
const createError = require("http-errors");

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  console.log(req.body);
  try {
    const result = await findUserAndUpdate(_id, {
      subscription,
    });
    if (!result) {
      throw createError(400, `missing field subscription`);
    }
    res.status(200).json({
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
