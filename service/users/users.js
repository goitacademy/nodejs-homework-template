const User = require('../../schemas/users');

const userSignup = async (body) => {
  const response = await User.create({ email, password });
  return response
};

const userLogin = async (body) => {
  const response = await User.findById(email);
  return response
};

const userLogout = async (body) => { 
  // const response = await User.
}

const userCurrent = async () => {

};

module.exports = {
    userSignup,
    userLogin,
    userLogout,
    userCurrent,
};