const User = require('../../schemas/users');

const userSignup = async (email, password) => {
  const response = await User.create({ email, password });
  return response
};

const userLogin = async (user, token) => {
  const response = await User.findOneAndUpdate({ _id: user.id }, { token: token }, { new: true });
  return response
};

const userLogout = async (body) => {
  const { email } = body;
  console.log(email);
  const response = await User.findOne({ email: email });
  return response
};

const userCurrent = async () => {

};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  userCurrent,
};