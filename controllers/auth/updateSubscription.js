const { User } = require("../../service");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const newSubscription = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.status(201).json({
    code: 201,
    status: "success",
    user: {
      email: newSubscription.email,
      subscription: newSubscription.subscription,
    },
  });
};
module.exports = updateSubscription;
