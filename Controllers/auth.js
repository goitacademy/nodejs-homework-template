const { User } = require("../Service/schemas/users");

const ctrlWrapper = require("../Helpers/CtrlWrapper");
const HttpError = require("../Helpers/HttpError");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const path = require('path');
const Jimp = require("jimp");

const SECRET_KEY = process.env.SECRET_KEY;

const avatarDir = path.join(__dirname, '../', "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 6);
  const avatarUrl = gravatar.url(email);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    password: newUser.password,
    avatarUrl: newUser.avatarUrl,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  console.log(id)
  await User.findByIdAndUpdate({ _id: id }, { token: " " });
  res.status(204).json({ message: "No content" });
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
      const { id } = req.user;
      const data = await User.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (!data) {
        throw HttpError(404, "Not found");
      }
      res.status(200).json(data);
};

const updateAvatar = async (req, res) => {
  const { id } = req.user;

  const { path: tempDir, originalname } = req.file;
   const img = await Jimp.read(tempDir);
  await img.resize(250, 250).write(tempDir);
   const filename = `${id}_small_${originalname}`;
  const resultDir = path.join(avatarDir, filename);
  await fs.rename(tempDir, resultDir);
  const avatarUrl = path.join("avatars", filename);

  await User.findOneAndUpdate({ _id: id }, {avatarUrl});

  res.status(200).json(`avatarUrl: ${avatarUrl}`);
};



module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  currentUser: ctrlWrapper(currentUser),
  updateAvatar: ctrlWrapper(updateAvatar),
};
