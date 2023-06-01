const bcrypt = require("bcrypt");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const HttpError = require("../helper/HttpError");
const gravatar = require("gravatar");

const avatarDir = path.join("__dirname", "../", "public", "avatars");

async function resize(resultUpload) {
  const image = await Jimp.read(resultUpload);
  await image.resize(250, 250);
  image.write(resultUpload);
}

// реєстрація клієнта
const register = async (body, res) => {
  const { email, password } = body;

  const currentUser = await User.findOne({ email: body.email });
  if (currentUser) {
    // throw new HttpError(409, "User alredy exist");
    return res.status(409).json({ message: "User alredy exist" });
  }
  body.password = await bcrypt.hash(body.password, 10);
  const avatarURL = gravatar.url(email);

  return await User.create(body, avatarURL);

  //   return res.status(201).end();
};

async function login(body) {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "User not found");
  }

  const passwordCompara = await bcrypt.compare(body.password, user.password);
  if (!passwordCompara) {
    console.log(password, user.password);
    throw new HttpError(401, "Password incorrect");
  }
  console.log(password, user.password);
  // token
  const { _id: id } = user;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const decodeedToken = jwt.decode(token);

  try {
    const token = jwt.verify(token, SECRET_KEY);
    await User.findByIdAndUpdate(currentUser._id, { token });
  } catch (error) {}

  return { token };
}

const logout = async (body) => {
  // Пошук і видаленя токену користувача
  const { _id } = body;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Logout success" });
};
// const userLogout = async (req, res, next) => {
//   await logoutCurrentUser(req.user);
//   res.status(200).json({ message: "No Content" });
// };

const patchAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  resize(resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = { register, login, logout, patchAvatar };
