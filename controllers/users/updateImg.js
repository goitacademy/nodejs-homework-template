const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const updateImg = async (req, res) => {
  const { id } = req.params;
  const { path: tempPath, originalname } = req.file;
  try {
    const uploadPath = path.join(avatarsDir, id, originalname);
    const file = await Jimp.read(tempPath);
    await file.resize(250, 250).write(tempPath);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = `/avatars/${id}/${originalname}`;
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({
      status: "success",
      code: 200,
      data: {
        result: avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = updateImg;
