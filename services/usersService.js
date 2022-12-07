const { User } = require("../schemas/usersSchema");

const getUserByEmail = async (email) => await User.findOne({ email });

const getUserById = async (id) => await User.findOne({ _id: id });

const createUser = async ({ password, email, subscription, avatarURL }) =>
  await User.create({
    password,
    email,
    subscription,
    avatarURL,
  });

const setToken = async (email, token) =>
  await User.findOneAndUpdate({ email }, { token });

const deleteToken = async (id) =>
  await User.findOneAndUpdate({ _id: id }, { token: null });

const updateSubscription = async ({ subscription }, { _id }) => {
  return await User.findOneAndUpdate(
    { _id },
    { subscription },
    {
      new: true,
    }
  );
};

const updateAvatar = async (avatarURL, { _id }) => {
  return await User.findOneAndUpdate(
    { _id },
    { avatarURL },
    {
      new: true,
    }
  );
};

module.exports = {
  createUser,
  getUserByEmail,
  setToken,
  getUserById,
  deleteToken,
  updateSubscription,
  updateAvatar,
};
