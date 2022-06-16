const { User } = require("../../models/user");

const subscriptionUpdate = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    if (!subscription) {
      res.status(404).json({ message: "Not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = subscriptionUpdate;
