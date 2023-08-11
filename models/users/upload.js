const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const avatarsDir = path.join(process.cwd(), "public/avatars");
const jimp = require("jimp");
const tempDir = path.join(process.cwd(), "public/temp");
const User = require("./model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: storage,
});

const updateAvatar = async (_id, tempUpload, originalname) => {
  const imageName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);

    jimp.read(avatarURL, (error, imageName) => {
      if (error) throw error;
      imageName.resize(250, 250).write(avatarURL);
    });
    return User.findByIdAndUpdate(_id, { avatarURL });
  } catch (error) {
    throw error;
  }
};

module.exports = { upload, updateAvatar };
