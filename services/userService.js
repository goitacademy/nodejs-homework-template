const User = require('../models/usersModel');

const addUser = ({ password, email, subscription, token = null }) => {
  try {
    return User.create({ password, email, subscription, token });
  } catch (err) {
    return false;
  }
};

const getUserByEmail = ({ email }) => {
  try {
    return User.findOne({ email });
  } catch (err) {
    return false;
  }
};

const getUserById = ({ _id }) => {
  try {
    return User.findById({ _id });
  } catch (err) {
    return false;
  }
};

const updateUserToken = ({ _id, body }) => {
  try {
    return User.findOneAndUpdate({ _id }, body, { new: true });
  } catch (err) {
    return false;
  }
};

const updateUserSubscription = ({ _id, body }) => {
  try {
    return User.findOneAndUpdate({ _id }, body, { new: true });
  } catch (err) {
    return false;
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  updateUserToken,
  updateUserSubscription,
};
