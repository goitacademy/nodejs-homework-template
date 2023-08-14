const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const nanoid = require("nanoid");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const { HttpError, sendVerificationEmail } = require("../utils");

sendVerificationEmail({
  to: "strheadshot1997@gmail.com",
  subject: "Second Test",
  html: "<p><strong>Hello, second TEST</strong></p>",
});
// const verificationToken = nanoid();

const avatarsDir = path.join(process.cwd(), "./", "public", "avatars");

const register = async (data) => {
  const { email, password } = data.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { d: "wavatar" }, true);

  const newUser = await User.create({
    ...data.body,
    password: hashedPassword,
    avatarURL,
    // verificationToken,
  });

  return newUser;
};

const login = async (data) => {
  const { email, password } = data.body;
  const user = await User.findOne({ email });

  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!user || !comparedPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });
  return token;
};

const logout = async (data) => {
  const { _id } = data.user;
  const result = await User.findByIdAndUpdate(_id, { token: null });

  return result;
};

const updateUserAvatar = async (data, _) => {
  const { _id } = data.user;
  const { path: tempDirUpload } = data.file;

  const imageName = `${_id}__avatar.jpg`;

  const finalDirUpload = path.join(avatarsDir, imageName);
  const avatarURL = path.join(avatarsDir, imageName);

  const userAvatar = await Jimp.read(tempDirUpload);
  await userAvatar.resize(250, 250).writeAsync(tempDirUpload);

  await fs.rename(tempDirUpload, finalDirUpload);

  await User.findByIdAndUpdate(_id, { avatarURL });
};

module.exports = {
  register,
  login,
  logout,
  updateUserAvatar,
};
