const User = require("../models/user");
const { httpError, ctrlWrapper, formattedDate } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

require("dotenv").config();
const { SECRET_KEY } = process.env;



const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res
    .status(201)
    .json({ user: { email, subscription: newUser.subscription} });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
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
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

const renewalSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  console.log("subscription", subscription);
  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true, select: "-_id email subscription" }
  );

  if (!result) {
    throw httpError(404, "Not Found");
  }
  res.status(200).json(result);
};


const avatarDir = path.join(__dirname, "..", "public", "avatars")


const updateAvatar = async (req, res) => {
// console.log('req.user', req.user)
// console.log('req.file in updateAvatar', req.file)
  const { email, _id } = req.user;
  const { path: tempPath, originalname } = req.file;

  const userName = email.substring(0, email.indexOf('@'));
  const originalExtension = path.extname(originalname);
   
  const fileName = `${userName}_${formattedDate}${originalExtension}`;

  const resultPath = path.join(avatarDir, fileName);

  
  Jimp.read(tempPath)
    .then((img) => img.resize(250, 250).write(resultPath))
    .then(async () => {
      await fs.unlink(tempPath);
      const avatarURL = path.join("avatars", fileName);
      await User.findByIdAndUpdate(_id, { avatarURL });
      res.status(200).json({ avatarURL });
    })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  renewalSubscription: ctrlWrapper(renewalSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
