const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require ("gravatar");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../","public","avatars");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  // let avatarURL;
  // if(req.file){
  //   const {path,originalname}= req.file;
  //   avatarURL = `/avatars/${req.user.id}_${originalname}`;
  //   await fs.rename(path, path.join(avatarsDir, `${req.user.id}_${originalname}`));
  // }
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL}); // gravatar must added
  console.log("New User Fields:", newUser.email);
  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
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
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });

  console.log("token", token);
  //   const decodeToken = jwt.decode(token);
  //   console.log("decodeToken", decodeToken);
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const userId = await User.findByIdAndUpdate(_id, { token: "" });
  if (!userId) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204).json({
    message: "No content",
  });
};

const updateAvatar = async (req, res) =>{
  const {_id} = req.user;
  const {path: tempUpload, originalname} = req.file;
  const filename = `${_id}_${originalname}`
  const resultUpload = path.join(avatarsDir, filename);

 
  try {
    await fs.rename(tempUpload,resultUpload);
    const image = await Jimp.read(resultUpload);

    await image
      .resize(250, 250)
      .quality(60)
      .write(resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (err) {
    console.error(err);

    // Additional error logging for better understanding of the issue
    if (err.code === "EPERM") {
      console.error("Permission issue:", err.message);
    }

    res.status(500).json({ message: "Internal Server Error" });
  }

}


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar)
};
