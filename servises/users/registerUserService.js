const { User } = require("../../db/userModel");

const registerUserService = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();

  return user;
};
module.exports = { registerUserService };
