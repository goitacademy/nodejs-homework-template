const fs = require("fs/promises");
const path = require("path");
const { User } = require("../model");

const usersAvatarsDir = path.join(__dirname, "../../", "public/avatars");

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
      },
    },
  });
};

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const resultPath = path.join(usersAvatarsDir, originalname);
  const { _id, email } = req.user;
  try {
    await fs.rename(tempPath, resultPath);
    const avatarURL = `avatars/${email}`;
    const user = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    await fs.unlink(tempPath);
  }
};

module.exports = {
  updateAvatar,
  getCurrent,
};
