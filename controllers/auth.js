const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
// const Jimp = require("jimp");

const { User } = require("../models/user");

const { HttpError, ctrlWrapper, resize } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body; // берем email и пароль из req.body
  const user = await User.findOne({ email }); // делаем запрос есть ли в базе такой email
  if (user) {
    throw HttpError(409, "Email in use");
  }
  
  const hashPassword = await bcrypt.hash(password, 10); // хешируем пароль
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({...req.body, password: hashPassword, avatarURL}); // сохраняем пользователя в базе

  res.status(201).json({
    user: {
      email: newUser.email,
    subscription: newUser.subscription,
    },    
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // проверяем наличие пользователя в базе
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  // если пользователь есть - сравниваем пароли
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" }); // шифруем token секретным ключом
  await User.findByIdAndUpdate(user.id, { token });


  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
   
  res.json({
    email,
    subscription,
  })
};

const logout = async (req, res) => {
  const {_id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({})
}

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  await resize(tmpUpload); // оброблюємо зображення
  const filename = `${_id}_${originalname}`;  // додаємо id до імені файлу щоб зробити його унікальним
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload); // переміщуємо файл з тимчасової папки tmp в publik/avatars
  const avatarURL = path.join("avatars", filename);   // шлях записуємо в базу
  await User.findByIdAndUpdate(_id, { avatarURL });  // знаючи id перезаписуємо avatarURL

  res.json({
    avatarURL,
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
