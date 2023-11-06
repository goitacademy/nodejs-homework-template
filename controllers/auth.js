const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const jimp = require("jimp");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email already in use");

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  // const decodeToken = jwt.decode(token);
  // console.log(decodeToken);

  // try {
  //   const { id } = jwt.verify(token, SECRET_KEY);
  //   console.log(id);
  // } catch (error) {
  //   console.log(error.message);
  // }

  // res.json({
  //   token,
  // });

  res.json({
    token: token,
    user: {
      email,
      subscription: "starter",
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout seccess" });
};


const updateAvater = async ( req, res, next) => {
  const { file } = req;
  const {_id} = req.user;
  const {mimetype} = req.file;

  if(mimetype !== 'image/jpeg'){
    throw HttpError(403, "File has wrong format");
  }

  const {path: tempUpload, originalname} = req.file;
  const filename = `${_id}_${originalname}`;

  const image = await jimp.read(file.path);
  image.resize(250, 250);
  await image.writeAsync(file.path);

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id,  {avatarURL})

  res.json({
    avatarURL,
  })
}

// const updateAvater = async ( req, res, next) => {
//   const {_id} = req.user;
//   const {mimetype} = req.file;

//   if(mimetype !== 'image/jpeg'){
//     throw HttpError(403, "File has wrong format");
//   }

//   const {path: tempUpload, originalname} = req.file;
//   const filename = `${_id}_${originalname}`;
//   const resultUpload = path.join(avatarsDir, filename);

//   await fs.rename(tempUpload, resultUpload);
//   const avatarURL = path.join('avatars', filename);
//   await User.findByIdAndUpdate(_id,  {avatarURL})

//   res.json({
//     avatarURL,
//   })
// }


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvater: ctrlWrapper(updateAvater),
};
