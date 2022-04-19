const { User } = require("../models/user");

const current = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  return res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );
  return res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = {
  current,
  updateSubscription,
};
