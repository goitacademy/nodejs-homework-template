const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { User } = require("../db/usersModel");
const { NoAuthorizedError, AuthConflictError } = require("../helpers/errors");
const { uploadDir, downloadDir } = require("../middlewares/uploadMiddleware");
require("dotenv").config();
const secret = process.env.SECRET;
const PORT = process.env.PORT;

const patchUserSubscription = async (id, subscription) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NoAuthorizedError("Not authorized");
  }
  await User.findByIdAndUpdate(id, { subscription });
  const userFind = await User.findById(id);
  return userFind;
};

const registration = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new AuthConflictError("Email is already in use");
  }

  const avatarURL = gravatar.url(email, {
    protocol: "http",
    s: "250",
  });
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  await newUser.save();
  const userFind = await User.findOne({ email }, { email: 1, subscription: 1 });
  return userFind;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.validPassword(password))) {
    throw new NoAuthorizedError("Email or password is wrong");
  }
  const payload = {
    id: user._id,
    email: user.email,
    subscription: user.subscription,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  await User.findOneAndUpdate({ email }, { token });
  const userFind = await User.findOne({ email }, { email: 1, subscription: 1 });
  return { token, userFind };
};

const logout = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NoAuthorizedError("Not authorized");
  }
  await User.findByIdAndUpdate(id, { token: null });
};

const uploadUserAvatar = async (id, file) => {
  Jimp.read(`${uploadDir}/${file.filename}`, (err, avatar) => {
    if (err) {
      throw new NoAuthorizedError("Not authorized");
    }
    avatar.resize(250, 250).write(`${downloadDir}/${file.filename}`); // save
  });

  const avatarURL = `http://localhost:${PORT}/api/avatars/download/${file.filename}`;
  await User.findOneAndUpdate({ _id: id }, { avatarURL });
  return avatarURL;
};

module.exports = {
  registration,
  login,
  logout,
  patchUserSubscription,
  uploadUserAvatar,
};
