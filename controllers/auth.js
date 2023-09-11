const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
// const generateUniqueId = require('generate-unique-id');

const { HttpError } = require('../helpers');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const { User } = require('../models/users');
const {sendEmail} = require('../helpers/sendEmail');

const { SECRET_KEY, BASE_URL } = process.env;
const avatarDir = path.join(__dirname, '../', 'public', 'avatars');


const register = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw HttpError(409, 'Email already is use');
  }
  const hashPass = await bcrypt.hash(password, 10);

  if (!req.body.avatar) {
    req.body.avatar = gravatar.url(req.body.email);
  }
  const verificationToken = uuidv4();

  const newUser = await User.create({
    ...req.body,
    password: hashPass,
    verificationToken,
  });

  const veryfyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target='_blank' href='${BASE_URL}/users/verify/${verificationToken}'>Clich here to verify your email</a>`,
  };

  await sendEmail(veryfyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatar,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  console.log(userExist);
  if (!userExist) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const isPassValid = await bcrypt.compare(password, userExist.password);
  if (!isPassValid) {
    throw HttpError(401, 'Email or password is wrong');
  }
  if (!userExist.verify) {
    throw HttpError(401, 'Email is not verified!');
  }
  const payload = { id: userExist._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findOneAndUpdate({ _id: userExist._id }, { token });
  res.status(200).json({
    token,
    user: {
      email: userExist.email,
      subscription: userExist.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate( _id, { token: '' });
  res.status(204).json({message: "Logout success"});
};

const current = async (req, res) => {
  console.log(req.headers);
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate({ _id }, {subscription});
  user.subscription = subscription;
  res.status(201).json(user);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  Jimp.read(tempUpload)
    .then((picture) => picture.resize(250, 250).write(resultUpload))
    .catch(error => {
      console.error(error);
    });
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);

  const avatar = path.join('avatars', fileName);
  await User.findByIdAndUpdate({ _id }, { avatar });

  res.status(200).json({ avatar });
};

const userVerify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: null }
  );
  // const user = User.findOne({verificationToken})
  // if (!user) {
  //   res.status(404).json({ message: 'User not found' });
  //   return;
  // }
  // await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""});
  res.status(200).json({ message: `Verification successful` });
};

const userReVerify = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email not found');
  }
  if (user.verify) {
    res.status(400).json({ message: 'Verification has already been passed' });
  }
  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target="_blank href="${BASE_URL}/users/verify/${user.verificationToken}">
    Click on verify email</a></p>`
  }
  await sendEmail(verifyEmail);
  res.status(200).json({ message: `Verification email sent` });
};

const verifyAgain = async(req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email })
  if (!user) {
    res.status(404).json({ message: `User not found` });
  }
  if (user.verify) {
    res.status(400).json({ message: `Verification has already been passed` });
  }
  const verifyEmail = {
    to: email,
    subject: 'Verify your email',
    html: `<a href = "${BASE_URL}/users/verify/${user.verificationToken}">Click here</a>`
  }
  sendEmail(verifyEmail)

  res.status(200).json({ message: `Verification email sent` });
}


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  userVerify: ctrlWrapper(userVerify),
  verifyAgain: ctrlWrapper(verifyAgain),
};