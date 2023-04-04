const userSubscriptionEnum = require("../../constans/userSubscriptionEnum");
const User = require("../../models/userModel");

const register = async (req, res, next) => {
  const newUserData = {
    ...req.body,
    subscription: userSubscriptionEnum.STARTER,
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: newUser,
     
    },
  });
};

module.exports = register;