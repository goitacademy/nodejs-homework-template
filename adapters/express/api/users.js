const { email } = require("../../../constants/regExp");
const User = require("../../../contacts/models/userModel");

const registerUser = async (body) => {
  const user = await new User(body);
  user.save();
  return user;
};
const findUser = async (email) => {
  const user = await User.find({ email });
  console.log(user);
  return user;
};
module.exports = { registerUser, findUser };
