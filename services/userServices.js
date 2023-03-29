const { User } = require("../models/userModel");

const currentUser = async (_id) => {
  return await User.findOne(
    { _id },
    { _id: 0, email: 1, subscription: 1, avatarURL: 1 }
  );
};

const changeUserSubscription = async (_id, subscription) => {
  return await User.findByIdAndUpdate({ _id }, subscription, {
    new: true,
    fields: {
      _id: 0,
      password: 0,
      token: 0,
    },
  });
};

const changeUserAvatar = async (_id, avatarURL) => {
  return await User.findByIdAndUpdate({ _id }, { avatarURL }, { new: true });
};

module.exports = {
  currentUser,
  changeUserSubscription,
  changeUserAvatar,
};
