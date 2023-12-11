const multer = require("multer");
const path = require("path");
const jimp = require("jimp");
const fs = require("fs");
const { HttpError } = require("../../helpers/HttpError");
const User = require("../../models/users");
const { checkToken } = require("../../middlewares/index");
const AVATARS_DIR = path.join(__dirname, "../../public/avatars");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const moveAvatarToPublic = async (fileName, userId) => {
  const tmpFilePath = path.join(__dirname, `../../tmp/${fileName}`);
  const destinationPath = path.join(AVATARS_DIR, `${userId}.jpg`);

  if (!fs.existsSync(tmpFilePath)) {
    throw new HttpError(400, "Temporary file not found");
  }

  try {
    const avatar = await jimp.read(tmpFilePath);
    await avatar.resize(250, 250).writeAsync(destinationPath);

    fs.unlinkSync(tmpFilePath);
  } catch (error) {
    console.error("Error processing image:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

const upload = multer({ storage });

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new HttpError(401, "Unauthorized"));
    }

    const userId = req.user._id;

    if (!req.file) {
      return next(new HttpError(400, "Missing avatar file"));
    }

    const fileName = req.file.filename;

    await moveAvatarToPublic(fileName, userId);

    const avatarURL = `/avatars/${userId}.jpg`;

    await User.findByIdAndUpdate(userId, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = [checkToken, upload.single("avatar"), updateAvatar];
