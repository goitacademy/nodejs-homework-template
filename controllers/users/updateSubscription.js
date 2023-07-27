const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { email } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { subscription },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email: updatedUser.email,
        subscription: updatedUser.subscription,
      },
    },
  });
};

module.exports = updateSubscription;