const User = require("./schemas/user");

const getUser = async (body) => User.findOne(body);

const updateUserSubscription = async (userId, subscription) => {
  return User.findByIdAndUpdate(userId, { subscription });
};

const updateUserAvatar = async (userId, avatarURL) => {
  return User.findByIdAndUpdate(userId, { avatarURL });
};

const deleteUser = async (userMail) =>
  User.findOneAndDelete({ email: userMail });

module.exports = {
  getUser,
  updateUserSubscription,
  updateUserAvatar,
  deleteUser,
};