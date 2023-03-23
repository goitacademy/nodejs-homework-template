const fs = require("fs/promises");

const path = require("path");

const Jimp = require("jimp");

const User = require("../../models");

const HttpError = require("../../helpers");

const destinationDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempPath, filename, mimetype } = req.file;
  const { _id } = req.user;

  if (mimetype !== "image/jpeg") {
    await fs.unlink(tempPath);
    throw HttpError(401);
  }

  try {
    const fileExtention = filename.split(".").pop();

    const avatarName = `${_id}.${fileExtention}`;

    const avatarUpload = path.join(destinationDir, avatarName);

    const avatarURL = path.join("avatars", avatarName);

    const tempAvatar = await Jimp.read(tempPath);

    await tempAvatar.resize(250, 250).write(avatarUpload);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    throw new Error(error);
  } finally {
    await fs.unlink(tempPath);
  }
};

module.exports = updateAvatar;

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempUpload, originalname } = req.file;

//   await Jimp.read(`${tempUpload}`)
//     .then((image) => {
//       return image.resize(250, 250).writeAsync(`${tempUpload}`);
//     })
//     .catch((err) => {
//       console.error(err);
//     });

//   const filename = `${_id}_${originalname}`;
//   const resultUpload = path.join(destinationDir, filename);
//   await fs.rename(tempUpload, resultUpload);
//   const avatarURL = path.join("avatars", filename);
//   await User.findByIdAndUpdate(_id, { avatarURL });

//   res.json({ avatarURL });
// };

// module.exports = updateAvatar;
