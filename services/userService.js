const { User } = require('../dataBase/usersModel');
const { WrongParametersError } = require('../helpers/errors');

async function getUser(userId) {
  const user = await User.findOne({ _id: userId }).select({
    __v: 0,
    token: 0,
    _id: 0,
    password: 0,
  });
  return user;
}

async function updateToken(userId, token) {
  await User.updateOne({ _id: userId }, { token });
}

async function updateSubscription(userId, body) {
  const newUserData = { subscription: body.subscription };

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    { $set: newUserData },
    { new: true },
  );

  if (!updatedUser) {
    throw new WrongParametersError(
      `Cannot update subscription in user by id:${userId}`,
    );
  }

  return updatedUser;
}
module.exports = { getUser, updateToken, updateSubscription };
