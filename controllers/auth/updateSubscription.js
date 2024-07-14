const { User } = require("../../models");
const { wrapper } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id, email } = req.user;

  await User.findByIdAndUpdate(_id, { subscription }, { new: true });

  res.json({
    email,
    subscription,
  });
};

module.exports = wrapper(updateSubscription);
