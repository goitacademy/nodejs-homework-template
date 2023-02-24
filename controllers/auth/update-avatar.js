const { createHttpException } = require("../../helpers");
const { UserModel } = require("../../models");
const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");

const tmpDirPath =
  "/Users/francuz_alexandr/Documents/GitHub/goit-node-rest-api/goit-node-hw-rest-api/tmp";
const avatarsDirPath =
  "/Users/francuz_alexandr/Documents/GitHub/goit-node-rest-api/goit-node-hw-rest-api/public/avatars";

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpDirPath);
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: multerConfig });

const updateUserAvatar = async (req, res, next) => {
  try {
    const { user } = req;

    const filePath = path.join("avatars", `${user.id}.jpeg`);

    Jimp.read(req.file.path, function (err, image) {
      if (err) throw err;
      image
        .resize(250, 250)
        .write(path.join(avatarsDirPath, `${user.id}.jpeg`));
    });

    await UserModel.findOneAndUpdate(
      { _id: user.id },
      {
        avatarURL: filePath,
      }
    );

    res.json({ avatarURL: filePath });
  } catch (error) {
    throw createHttpException(401, "not authorized");
  }
};
module.exports = {
  updateUserAvatar,
  upload,
};
