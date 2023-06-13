const { User } = require("../User");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../../utils/HttpError");
const bcrypt = require("bcryptjs");
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN } = process.env;
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const signupService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, "Email in use");
  }
  const avatarUrl = gravatar.url(email);
  return await User.create({ email, password, avatarUrl });
};

const loginService = async ({ email, password }) => {
  const fetchedUser = await User.findOne({ email });
  if (!fetchedUser) {
    throw new HttpError(401, "Email or password invalid");
  }

  const isPasswordCorrect = await fetchedUser.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password invalid");
  }

  const payload = { id: fetchedUser._id };
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  await User.findByIdAndUpdate(fetchedUser._id, { token });

  return { user: fetchedUser, token };
};

const logoutService = async ({ _id }) => {
  await User.findOneAndUpdate(_id, { token: "" });
};

const avatarStorage = path.join(__dirname, "../../", "public", "avatars");

const updateAvatarService = async (user, file) => {
  const { _id } = user;
  const { path: tempPath, originalname } = file;

  const image = await Jimp.read(tempPath);
  image.resize(250, 250);
  await image.writeAsync(tempPath);

  const imageName = `${_id}_${originalname}`;
  const newPath = path.join(avatarStorage, imageName);
  await fs.rename(tempPath, newPath);

  const avatarUrl = path.join("avatars", imageName);
  await User.findByIdAndUpdate(_id, { avatarUrl });
};

module.exports = {
  signupService,
  loginService,
  logoutService,
  updateAvatarService,
};
