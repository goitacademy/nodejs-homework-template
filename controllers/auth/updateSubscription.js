const { User } = require("../../models/user");

const typesOfSubscription = ["starter", "pro", "business"];

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = typesOfSubscription.find((item) => item === subscription);
  if (!result) {
    throw Error("This subscription doesn't exist");
  }
  await User.findByIdAndUpdate(_id, { result });
  res.json({
    user: {
      result,
    },
    message: "Subscription updated",
  });
};

module.exports = updateSubscription;
