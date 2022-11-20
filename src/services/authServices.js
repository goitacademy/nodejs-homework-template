const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const { NotAuthorizedError } = require("../helpers/errors");
const { User } = require("../db/userModel");

const registration = async (email, password) => {
  const avatarURL = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    avatarURL,
  });
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

const logout = async (user) => {
  user.token = null;
};

const currentUser = async (userId) => {
  const user = await User.findById(userId);
  const { email, subscription } = user;
  return { email, subscription };
};

const changeSubscription = async (id, subscription) => {
  await User.findByIdAndUpdate(id, { subscription });
};

const changeAvatar = async (filePath, name, id) => {
  const newPath = path.resolve(`./public/avatars/${name}`);
  const avatarURL = `/avatars/${name}`;
  const image = await Jimp.read(filePath);
  try {
    await image.resize(250, 250);
    await image.writeAsync(newPath);
    await User.findByIdAndUpdate(id, { avatarURL });
    return avatarURL;
  } catch (error) {
    return error;
  }
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  changeSubscription,
  changeAvatar,
};
