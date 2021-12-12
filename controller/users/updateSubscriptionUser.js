const { User } = require("../../model");

const updateSubscriptionUser = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription });
  res.json({
    status: "success",
    code: 200,
    data: {
      user: { email, subscription },
    },
  });
};

module.exports = updateSubscriptionUser;
