const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../models/user");

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

module.exports = {
  current,
  updateSubscription,
  updateAvatar,
};
