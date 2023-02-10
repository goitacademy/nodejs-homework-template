const Users = require('../models/usersModel');

const addUser = ({ password, email, subscription, token }) => {
  try {
    return Users.create({ password, email, subscription, token });
  } catch (err) {
    return false;
  }
};

const getUser = ({ email }) => {
  try {
    return Users.findOne({ email });
  } catch (err) {
    return false;
  }
};

module.exports = {
  addUser,
  getUser,
};
