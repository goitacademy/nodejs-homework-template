const User = require("./schemas/user");

const fyndById = async (userId) => {
  return await User.findOne({ _id: userId });
};

const fyndByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (data) => {
  const user = await new User(data);
  return await user.save();
};

const updateToken = async (userId, token) => {
  return await User.updateOne({ _id: userId }, { token });
};

const updateSubscription = async (userId, body) => {
  return await User.findByIdAndUpdate(
    { _id: userId },
    { ...body },
    { new: true }
  );
};

module.exports = {
  fyndById,
  fyndByEmail,
  createUser,
  updateToken,
  updateSubscription,
};
