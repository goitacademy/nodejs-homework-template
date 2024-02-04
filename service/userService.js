const User = require("./schemas/userSchemas");

const signUpNewUser = async (email, pass) => {
  const newUser = new User({ email });
  newUser.setPassword(pass);
  return await newUser.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne(email);
};

const findUserByIdAndUpdate = async (id, token) => {
  return await User.findByIdAndUpdate(id, token);
};

module.exports = {
  signUpNewUser,
  findUserByEmail,
  findUserByIdAndUpdate,
};
