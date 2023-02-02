const { User } = require("../../models");

const updateSubscribe = async (req, res, next) => {
  try {
    // console.log(req.user);
    const { _id, subscription } = req.user;
    const user = await User.findByIdAndUpdate(
      _id,
      { ...req.body },
      { new: true }
    );

    if (subscription === req.body.subscription) {
      res
        .status(200)
        .json({
          message: `Your subscription has been successfully updated to '${req.body.subscription}'`,
        });
    }
    res.json({
      status: "success",
      code: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscribe;
