const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const registerUser = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ "message": "Email in use" });
    }

    const avatarURL = gravatar.url(email);

    const result = await User.create({ email, password, avatarURL });

    res.status(201).json({
      user: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const loginUser = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const match = await bcrypt.compare(password, user.password);

    if (!user || !match) {
      return res.status(401).json({ "message": "Email or password is wrong" });
    }

    const payload = {
      id: user._id
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const currentUser = catchAsync(async (req, res) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({
      user: { email, subscription }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const logoutUser = catchAsync(async (req, res) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  let tempUpload;
  try {
    const { path: tempUploadPath, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;

    const resultUpload = path.join(avatarDir, imageName);

    await jimp.read(tempUploadPath).then((img) => {
      return img.resize(250, 250).write(resultUpload);
    });

    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    if (tempUpload) {
      await fs.unlink(tempUpload);
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  logoutUser,
  updateAvatar
};