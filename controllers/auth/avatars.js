const fs = require("fs/promises");
const path = require("path");
const { UserModel } = require("../../models/user");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const avatars = async (req, res, next) => {
  try {
    const { originalname, path: tempUpload } = req.file;
    console.log(req.file);
    const fileName = Date.now() + originalname;
    const resultUpload = path.join(avatarDir, fileName);

    await fs.rename(tempUpload, resultUpload);

    Jimp.read(resultUpload)
      .then((img) => {
        return img
          .resize(250, 250) // resize
          .quality(60) // set JPEG quality
          .write(resultUpload); // save
      })
      .catch((err) => {
        next(err);
      });

    const avatarURL = path.join("avatars", fileName);
    await UserModel.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

module.exports = avatars;
