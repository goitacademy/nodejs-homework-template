const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;

  const { subscription } = req.body;
  const updateUserSubscription = await User.findByIdAndUpdate(_id, {
    subscription,
  });

  res.json({
    status: "success",
    code: 201,
    data: {
      email: email,
      subscription: subscription,
    },
  });
};

module.exports = updateSubscription;
