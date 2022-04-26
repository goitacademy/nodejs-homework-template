const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../models/user");
const sendEmail = require("../services/sendGridEmail");

const current = async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
        avatarUrl: user.avatarUrl,
      },
    },
  });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { subscription },
    { new: true }
  );
  return res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const updateAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  try {
    const resultUpload = path.join(
      __dirname,
      "../",
      "public",
      "avatars",
      `${_id}_${originalname}`
    );
    await fs.rename(tmpUpload, resultUpload);
    const avatarUrl = path.join("public", "avatars", `${_id}_${originalname}`);
    const avatar = await Jimp.read(avatarUrl);
    await avatar
      .autocrop()
      .cover(
        200,
        200,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .quality(60)
      .writeAsync(avatarUrl);
    const user = await User.findByIdAndUpdate(
      _id,
      { avatarUrl },
      { new: true }
    );
    return res.json({
      status: "success",
      code: 200,
      data: {
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    await fs.unlink(tmpUpload);
    next(error);
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  }
};

const reverifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  } else if (user && user.verify) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Verification has already been passed",
    });
  } else if (user && !user.verify) {
    const newEmail = {
      to: email,
      subject: "Please confirm your email address",
      html: `<a target="_blank" href="http://localhost:3001/api/users/verify/${user.verificationToken}">Follow the link to confirm</a>`,
    };
    await sendEmail(newEmail);
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  }
};

module.exports = {
  current,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  reverifyEmail,
};
