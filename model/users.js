const User = require("./schemas/userSchema");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByVeryfyTokenEmail = async (token) => {
  return await User.findOne({ VeryfyTokenEmail: token });
};

const create = async ({ name, email, password, subscription }) => {
  const user = new User({ name, email, password, subscription });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, subscription) => {
  console.log("🚀 ~ file: users.js ~ line 21 ~ updateSubscription ~ id", id);
  // return await User.updateOne({ _id: id }, { subscription });
  return await User.findByIdAndUpdate(
    { _id: id },
    { ...subscription },
    { new: true }
  );
};

const updateAvatar = async (id, avatar, idCloudAvatar = null) => {
  return await User.updateOne({ _id: id }, { avatar, idCloudAvatar });
};

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.updateOne(
    { _id: id },
    { verify, verifyTokenEmail: verifyToken }
  );
};

module.exports = {
  findByEmail,
  findByVeryfyTokenEmail,
  findById,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  updateVerifyToken,
};
