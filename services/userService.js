const { User } = require('../dataBase/usersModel');

async function getUser(userId) {
  const user = await User.findOne({ _id: userId });
  return user;
}

module.exports = { getUser };
