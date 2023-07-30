const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const path = require("path");
const { ctrlWrapper } = require("../utils/ctrlWrapper");
const { HttpError } = require("../utils");
const fs = require("fs/promises");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Проверяем есть ли пользователь с таким емейлом
  if (user) {
    throw HttpError(409, "This email address is already being used");
  }
  // Хешируем пароль
  const hashPassword = await bcrypt.hash(password, 10);
  
  const avatarURL = gravatar.url(email);

  console.log(avatarURL);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarURL,
  });

  console.log(newUser);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      // avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Проверяем есть ли пользователь с таким емейлом
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Invalid email or password");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Invalid email or password");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  // Записываем токен пользователя в базу
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

// Проверяем авторизовани ли пользователь и выводим его имя и почту
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  // Удаляем токен пользователя с базы
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  // Берем временный путь
  const { path: tempUpload, originalname } = req.file;
  // Добовляем Id к имени файла
  const fileName = `${_id}${originalname}`;
  // Создаем новый путь, где должны быть данные
  const resultUpload = path.join(avatarsDir, fileName);
  // Перемещаем данные
  await fs.rename(tempUpload, resultUpload);
  // Записываем новый путь в БЗ
  const avatarURL = path.join("avatars", fileName);

  // console.log(`req.file: ${JSON.stringify(req.file)}`);
  // console.log(`tempUpload: ${tempUpload}`);
  // console.log(`originalname: ${originalname}`);
  // console.log(`resultUpload: ${resultUpload}`);
  // await User.findById(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
