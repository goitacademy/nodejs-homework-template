const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
const { clearScreenDown } = require("readline");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const dirAvatars = path.join(__dirname, "../public/avatars");

const signupUser = async (req, res) => {
  const { email, password, subscription } = req.body;

  const verificationUser = await User.findOne({ email });
  if (verificationUser) {
    return res.status(409).send({ message: "Email in use" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: "Thank you for registering",
    html: `<h1>To confirm registration follow the <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a></h1>`,
  };

  await sgMail.send(msg);

  res.status(201).json({
    user: {
      email: newUser.email,
      verificationToken: newUser.verificationToken,
      subscription: newUser.subscription,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: "Email or password is wrong" });
  }

  const verificationPassword = bcrypt.compareSync(password, user.password);
  if (!verificationPassword) {
    return res.status(401).send({ message: "Email or password is wrong" });
  }

  if (!user.verify) {
    return res.status(404).send({ message: "User not verified" });
  }

  const { subscription, _id } = user;
  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "30d"});
  await User.findByIdAndUpdate(_id, { token });

  res.status(200).send({
    token,
    user: { email: user.email, subscription, _id },
  });
};

const logoutUser = async (req, res) => {
  const { id } = req.user;
  
  await User.findByIdAndUpdate(id, { token: '' });
  res.status(204).send();
};

const currentUser = async (req, res) => {
  const { name, email, subscription } = req.user;
  res.status(200).json({ name, email, subscription });
};

const avatarUser = async (req, res) => {
  const { path: tempUpload, filename } = req.file;

  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).write(tempUpload);
  
  const extension = filename.split(".").pop();
  const updatedFileName = `${req.user._id}.${extension}`;
  const fileUpload = path.join(dirAvatars, updatedFileName);
  await fs.rename(tempUpload, fileUpload);
  
  const avatarURL = path.join("avatars", updatedFileName);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });
  res.json({ avatarURL });
};

const verificationTokenUser = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).send({ message: "User not found verification" });
  }
  await User.findOneAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  res.status(200).json({ message: "Verification successful" });
};

const verifyUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Missing required field email" });
  }

  const user = await User.findOne({ email });
  const { verify, verificationToken } = user;

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  if (verify) {
    return res
      .status(400)
      .send({ message: "Verification has already been passed" });
  }
  
  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: "Thank you for registering",
    html: `<h1>To confirm registration follow the <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a></h1>`,
  };

  await sgMail.send(msg);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  avatarUser,
  verificationTokenUser,
  verifyUser,
};