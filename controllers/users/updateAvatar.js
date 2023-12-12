const multer = require("multer");
const path = require("path");
const jimp = require("jimp");
const { HttpError } = require("../../helpers/HttpError");
const User = require("../../models/users");
const fs = require("fs");
const checkToken = require("../../middlewares/checkToken");

const AVATARS_DIR = path.join(__dirname, "../../public/avatars");
const TMP_DIR = path.join(__dirname, "../../tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const moveAvatarToPublic = async (fileName, userId) => {
  try {
    const avatar = await jimp.read(path.resolve(TMP_DIR, fileName));
    await avatar
      .resize(250, 250)
      .writeAsync(path.resolve(AVATARS_DIR, `${userId}.jpg`));

    fs.unlinkSync(path.resolve(TMP_DIR, fileName));
  } catch (error) {
    console.error("Error moving avatar:", error);
    throw error;
  }
};

const upload = multer({ storage });

const updateAvatar = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return next(new HttpError(401, "Unauthorized"));
  }

  const userId = req.user._id;

  try {
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
