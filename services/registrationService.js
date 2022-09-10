const { User } = require("../db/userModel");

const registration = async (username, password) => {
  const user = new User({ username, password });
  if (user) await user.save();
  return user;
};

const updateToken = async (userId, token) => {
  const data = await User.findOneAndUpdate(
    { _id: userId },
    { token: token },
    { new: true }
  ).select({
    __v: 0,
    _id: 0,
    password: 0,
    deposits: 0,
  });
  return data;
};

module.exports = {
  registration,
  updateToken,
};
