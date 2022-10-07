const { User } = require("../../service");

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  try {
    const newSubscription = await User.findByIdAndUpdate(_id, { subscription });
    const newData = newSubscription.subscription;
    res.status(201).json({
      user: { email: newSubscription.email, subscription: newData },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = updateSubscription;
