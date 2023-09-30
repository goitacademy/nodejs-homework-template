const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar');
require("dotenv").config();
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');


const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email is already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};


const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  })
};


const logout = async (req, res) => {
  const { _id } = req.user;
   await User.findByIdAndUpdate(_id, { token: '' });

    res.status(204).json({
    message: 'Logout success'
  })
};


// const updateSubscription = async (req, res) => {
//   const { subscription } = req.body;

//    try {
//     // Перевірка, чи передано коректне значення підписки
//      if (!["starter", "pro", "business"].includes(subscription)) {
      
//       return res.status(400).json({ error: "Invalid subscription value" });
//     }

//     // Оновлення підписки користувача
//     const updatedUser = await User.findByIdAndUpdate(req.user.id, { subscription }, { new: true });

//     res.status(200).json({
//       email: updatedUser.email,
//       subscription: updatedUser.subscription,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };



// або без використання try/catch

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  if (["starter", "pro", "business"].includes(subscription)) {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { subscription }, { new: true });
    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });

}else {
    throw HttpError(401, 'Invalid subscription value');
  }
};


const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
   const img = await Jimp.read(tmpUpload);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tmpUpload);

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  })

}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
