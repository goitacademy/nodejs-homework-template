const { User } = require("../models");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { NotFound } = require("http-errors");
const sgMail = require("@sendgrid/mail");
const { nanoid } = require("nanoid");

const { SECRET_KEY, SENDGRID_API_KEY } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

sgMail.setApiKey(SENDGRID_API_KEY);

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        message: "Email in use",
      });
    }
    const avatarURL = await gravatar.url(email);
    const verificationToken = nanoid();
    const newUser = await User({ email, avatarURL, verificationToken });
    await newUser.setPassword(password);
    await newUser.save();
    const mail = {
      to: email,
      from: "shopoff98@gmail.com",
      subject: "Подтверждение email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
    };

    await sgMail.send(mail);

    res.status(201).json({
      user: {
        email,
        subscription: "starter",
        avatarURL,
        verificationToken,
      },
    });
  } catch (error) {
    console.log(error.message);
    console.log("sdjksjdksjds");
    throw error;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    res.status(409).json({
      message: "Email or password is wrong",
    });
  }
  const payload = await {
    id: user._id,
  };
  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  await res.json({
    token,
    user: {
      email: "example@example.com",
      subscription: "starter",
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    user: {
      email,
      subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = await path.join(avatarsDir, originalname);
    Jimp.read(tmpUpload, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250).write(tmpUpload);
    });
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = await path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

const verification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound("User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  res.json({
    message: "Verification successful",
  });
};

const reVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const verificationToken = nanoid();
    if (user.verify) {
      res.status(400).json({ message: "Verification has already been passed" });
    }
    const mail = {
      to: email,
      from: "shopoff98@gmail.com",
      subject: "Подтверждение email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
    };

    await sgMail.send(mail);

    res.json({ message: "Verification email sent" });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
module.exports = {
  signUp,
  login,
  logout,
  currentUser,
  updateAvatar,
  verification,
  reVerification,
};
