const { User } = require('../dataBase/usersModel');

async function getUser(userId) {
  const user = await User.findOne({ _id: userId });
  return user;
}

async function updateToken(userId, token) {
  await User.updateOne({ _id: userId }, { token });
}

module.exports = { getUser, updateToken };
