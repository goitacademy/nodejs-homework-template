const { User } = require("../../models");

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { subscription } = req.body;

    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    if (!result) {
      const error = new Error(`contact with id=${_id} Not Found`);
      error.status = 404;
      throw error;
    }
    res.json({
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
