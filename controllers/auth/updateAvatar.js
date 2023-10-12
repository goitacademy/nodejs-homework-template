const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  await Jimp.read(resultUpload)
    .then((image) => {
      console.log("first");
      return image.resize(Jimp.AUTO, 250).write(resultUpload);
    })
    .catch(next(HttpError(500, { message: "Server error" })));

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      avatarURL,
    },
  });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };

// Jimp.read("./path/to/image.jpg")
//   .then((image) => {
//     // Do stuff with the image.
//   })
//   .catch((err) => {
//     // Handle an exception.
//   });
