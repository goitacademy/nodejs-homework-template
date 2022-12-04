const User = require("./schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const selectAvatar = "avatar -_id";
const { avatarRenameAndSave, avatarDelete } = require("../helpers/avatarSaver");
const { NotAutorizedError } = require("../helpers/errors");

const signup = async (email, password, avatar) => {
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    avatar: gravatar.profile_url(email),
  });
  await user.save();
};

const signin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAutorizedError(`User ${email} not found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAutorizedError("Incorrect password");
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      subscription: user.subscription,
      avatar: user.avatar,
    },
    process.env.JWT_SECRET
  );
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: { token } },
    { new: true }
  );
  return updatedUser;
};

const logout = async (id) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new NotAutorizedError("Not authorized");
  }
  await User.findByIdAndUpdate({ _id: id }, { token: null });
};

const updateUserAvatar = async ({ id, token, avatarPath }) => {
  const oldAvatarURL = await User.findOne({ _id: id, token }, selectAvatar);
  if (oldAvatarURL.avatar) {
    await avatarDelete(oldAvatarURL.avatar);
  }

  const avatarURL = await avatarRenameAndSave(avatarPath);
  const updatedCurrentUserAvatar = await User.findOneAndUpdate(
    { _id: id, token },
    { $set: { avatarURL } },
    {
      new: true,
      projection: selectAvatar,
    }
  );
  if (!updatedCurrentUserAvatar) {
    throw new NotAutorizedError("Not authorized");
  }
  return updatedCurrentUserAvatar;
};
const currentUser = async (id) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new NotAutorizedError("Not authorized");
  }
  return user;
};
module.exports = {
  signup,
  signin,
  logout,
  currentUser,
  updateUserAvatar,
};
