const User = require('../models/usersModel');

const addUser = ({ password, email, subscription, token }) => {
  try {
    return User.create({ password, email, subscription, token });
  } catch (err) {
    return false;
  }
};

const getUser = ({ email }) => {
  try {
    return User.findOne({ email });
  } catch (err) {
    return false;
  }
};

module.exports = {
  addUser,
  getUser,
};
