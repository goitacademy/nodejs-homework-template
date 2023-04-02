const User = require('../models/usersModel');

const addUser = ({
  password,
  email,
  subscription,
  token = null,
  verificationToken,
}) => {
  try {
    return User.create({
      password,
      email,
      subscription,
      token,
      verify: false,
      verificationToken,
    });
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

const updateUserAvatar = ({ _id, body }) => {
  try {
    return User.findOneAndUpdate({ _id }, body, { new: true });
  } catch (err) {
    return false;
  }
};

const verifyToken = ({ verificationToken }) => {
  try {
    return User.findOneAndUpdate(
      { verificationToken },
      { verify: true, verificationToken: null },
      { new: true }
    );
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
  updateUserAvatar,
  verifyToken,
};
