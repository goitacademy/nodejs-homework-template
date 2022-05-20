const User = require("../service/schemas/User");

const signUser = async ({ res, value }) => {
  const user = await User.findOne({
    email: value.email,
  });

  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  const newUser = new User({
    email: value.email,
    subscription: value.subscription,
  });
  await newUser.setPassword(value.password);
  await newUser.save();

  return newUser;
};

module.exports = {
  signUser,
};
