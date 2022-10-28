const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;

  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(_id, { subscription });

  res.json({
    status: "success",
    code: 201,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = updateSubscription;
