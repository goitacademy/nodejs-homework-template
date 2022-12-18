const { User } = require("../../models");
const createError = require("http-errors");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { _id } = req.user;
  const newName = `${_id}_${originalname.split(" ").join("")}`;

  const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
  const resultPath = path.join(avatarsDir, newName);

  try {
    await Jimp.read(tempPath)
      .then((lenna) => {
        return (
          lenna
            .resize(150, Jimp.AUTO) // resize
            .quality(60) // set quality
            // .greyscale() // set greyscale
            .write(tempPath)
        ); // save
      })
      .catch((err) => {
        console.error(err);
        throw createError(401, "Not authorized");
      });
    await fs.rename(tempPath, resultPath);
    const avatarURL = path.join("public", "avatars", newName);
    await User.findByIdAndUpdate({ _id: _id }, { avatarURL }, { new: true });

    res.status(200).json({
      status: "succes",
      code: 200,
      avatarURL,
    });
  } catch (error) {
    fs.unlink(tempPath);
    throw createError(401, "Not authorized");
  }
};

module.exports = updateAvatar;
