const User = require("../models/user");
const gravatar = require("gravatar")
const path = require("path")
const fs = require("fs/promises")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { SECRET_KEY } = process.env;

const HttpErrors = require("../helpers/HttpErrors");

const avatarsDir = path.join(__dirname, "../", "public", "avatars")

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpErrors(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({ ...req.body, avatarURL, password: hashPassword });
  console.log(result)
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpErrors(401, "Email or password is wrong");
  }
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpErrors(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id,  {token})
  res.json({ token });
};

const getCurrent = async (req, res) => {
const {email} = req.user;
res.json({
  email,

})
}

const logout = async (req, res) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});
  res.json({
message: "Logout success"
  })
}

const updateAvatar = async (req, res) => {
  const {_id} = req.user
const {path: tempUpload, originalname} = req.file;
const filename = `${_id}_${originalname}`
const resultUpload = path.join(avatarsDir, filename)
await fs.rename(tempUpload, resultUpload);
const avatarURL = path.join("avatars", filename);
await User.findByIdAndUpdate(_id, {avatarURL})
res.json({ avatarURL });
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar)
};
