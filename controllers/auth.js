const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const UserModel = require("../models/modelUsers");
const { HttpError, ctrlWrapper } = require("../helpers");
const sendActivetionMail = require("../helpers/mailServis");

const { SECRET_KYE } = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: 250 });
  const verificationToken = nanoid();
  const newUser = await UserModel.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  if (!newUser) {
    throw HttpError(404, "Not found");
  }
  const { email: emailUse, subscription } = newUser;
  const message = {
    from: process.env.SMTP_USER,
    to: email,
    subject: process.env.API_URL,
    text: `To confirm your registration, please clik on link below\n
    http://localhost:3000/users/verify/${verificationToken}`,
    html: `<p>To confirm your registration, please clik on link below</p>
    <p><a href="http://localhost:3000/users/verify/${verificationToken}">Clic</a></p>`,
  };
  await sendActivetionMail(message);

  res.status(201).json({ user: { email: emailUse, subscription } });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Password or email invalid");
  }
  if (!user.verify) {
    throw HttpError(401, "Not verify");
  }
  const payloade = { id: user._id };
  const token = jwt.sign(payloade, SECRET_KYE, { expiresIn: "23h" });
  await UserModel.findByIdAndUpdate(user._id, { token });
  res.status(201).json({
    user: { email: user.email, subscription: user.subscription },
    token,
  });
};
const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};
const logout = async (req, res) => {
  const user = req.user;
  await UserModel.findByIdAndUpdate(user._id, { token: "" });
  res.status(204).json();
};
const nweAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const fileName = `${req.user._id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);
  // ==========================================================

  await Jimp.read(tmpUpload)
    .then(async (avatar) => {
      return avatar.resize(250, 250).quality(60).writeAsync(tmpUpload);
    })
    .catch((err) => {
      console.error(err);
    });
  // ===========================================================

  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("/avatars", fileName);
  await UserModel.findByIdAndUpdate(req.user._id, { avatarURL });
  res.status(200).json({ avatarURL });
};
const authVerify = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await UserModel.findOne({ verificationToken });

  if (!user) {
    throw HttpError(401, "User not found");
  }

  if (user.verify) {
    throw HttpError(404, "You verify");
  }

  await UserModel.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).json({ message: "Verification successful" });
};

const verify = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const message = {
    from: process.env.SMTP_USER,
    to: email,
    subject: process.env.API_URL,
    text: `To confirm your registration, please clik on link below\n
    http://localhost:3000/users/verify/${user.verificationToken}`,
    html: `<p>To confirm your registration, please clik on link below</p>
    <p><a href="http://localhost:3000/users/verify/${user.verificationToken}">Clic</a></p>`,
  };

  await sendActivetionMail(message);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  nweAvatar: ctrlWrapper(nweAvatar),
  authVerify: ctrlWrapper(authVerify),
  verify: ctrlWrapper(verify),
};
