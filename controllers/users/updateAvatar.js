const multer = require("multer");
const path = require("path");
const jimp = require("jimp");
const { HttpError } = require("../../helpers/HttpError");
const User = require("../../models/users");

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
  const avatar = await jimp.read(path.join(__dirname, `../../tmp/${fileName}`));
  await avatar
    .resize(250, 250)
    .writeAsync(path.join(AVATARS_DIR, `${userId}.jpg`));
};

const upload = multer({ storage });

const updateAvatar = async (req, res, next) => {
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

module.exports = [upload.single("avatar"), updateAvatar];
