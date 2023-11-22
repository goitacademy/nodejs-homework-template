const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const uploadAndProcessAvatar = (req, res, next) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      next(err);
    } else {
      try {
        const { path: avatarPath } = req.file;

        const image = await Jimp.read(avatarPath);

        image.resize(250, 250);

        const resizedAvatarPath = `${tempDir}/resized_${req.file.originalname}`;
        await image.writeAsync(resizedAvatarPath);

        fs.unlink(avatarPath, (err) => {
          if (err) {
            console.error(`Failed to delete temporary file: ${avatarPath}`);
          }
        });

        req.file.path = resizedAvatarPath;

        next();
      } catch (error) {
        next(error);
      }
    }
  });
};

module.exports = {
  uploadAndProcessAvatar,
};
