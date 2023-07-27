const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const { HttpError } = require("../utils");
const { ctrlWrapper } = require("../utils/ctrlWrapper");

// console.log(process.env);

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Проверяем есть ли пользователь с таким емейлом
  if (user) {
    throw HttpError(409, "This email address is already being used");
  }
  // Хешируем пароль
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
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
  });
};

// Проверяем авторизовани ли пользователь и выводим его имя и почту
const getCurrent = async (req, res) => {
  const { name, email } = req.user;

  res.json({
    name,
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  // Удаляем токен пользователя с базы
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Loguot success!",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
