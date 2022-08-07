const { User } = require("../db/userModel");
const { WrongParametersError } = require("../Helpers/errors");

const updateToken = async (userId, token) => {
  const data = await User.findOneAndUpdate(
    { _id: userId },
    { token: token },
    { new: true }
  );
  return data;
};
const getUser = async (userId) => {
  const user = await User.findOne({ _id: userId }).select({
    __v: 0,
    // token: 0,
    _id: 0,
    password: 0,
  });
  return user;
};
const updateSubscription = async (userId, sub) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { subscription: sub } },
    { new: true }
  ).select({
    __v: 0,
    token: 0,
    // _id: 0,
    password: 0,
  });

  if (!updatedUser) {
    throw new WrongParametersError(
      `Cannot update subscription in user by id:${userId}`
    );
  }

  return updatedUser;
};

module.exports = {
  updateToken,
  getUser,
  updateSubscription,
};
