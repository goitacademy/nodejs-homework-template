const User = require("./models/userModel");
const registerUser = async (body) => {
  const user = await new User({...body});
  user.save();
  return user;
};
const findUser = async (email) => {
  const user = await User.find({email});
  return user
};

const findUserById = async (_id) => {
  const user = await User.find({_id});
  return user
}
module.exports = { registerUser, findUser,findUserById };
