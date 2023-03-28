const fs = require("fs/promises");
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

const changeUserAvatar = async (_id, path, publicPath, avatarURL) => {
  try {
    await fs.rename(path, publicPath);

    return await User.findByIdAndUpdate({ _id }, { avatarURL }, { new: true });
  } catch (error) {
    await fs.unlink(path, (err) => {
      if (err) throw new Error(err);
    });
  }
};

module.exports = {
  currentUser,
  changeUserSubscription,
  changeUserAvatar,
};
