const { User } = require("../../models/user");

const updateSubscription = async (req, res, next) => {
  const { _id, subscription, email } = req.user;

  await User.findByIdAndUpdate(_id, req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      subscription,
      email,
    },
  });
};

module.exports = updateSubscription;
