const path = require("path");
const fs = require("fs").promises;
const crypto = require("crypto");
const service = require("../services/user.service");
const Jimp = require("jimp");

const storeAvatarDir = path.join(process.cwd(), "public", "avatars");

const uploadAvatar = async (req, res, next) => {
  const { description } = req.body;
  const { path: temporaryName } = req.file;

  const fileName = path.join(
    storeAvatarDir,
    crypto.createHash("md5").update(req.user.email).digest("hex") + ".jpg"
  );

  try {
    await Jimp.read(temporaryName)
      .then((avatarImg) => {
        return avatarImg.resize(250, 250).quality(90).write(temporaryName);
      })
      .catch((err) => {
        console.error(err);
      });
    await fs.rename(temporaryName, fileName);
    await service.updateAvatar(req.user.id, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({
    description,
    message: "Plik załadowany pomyślnie",
    status: 200,
    avatarUrl: fileName,
  });
};

module.exports = {
  uploadAvatar,
};
