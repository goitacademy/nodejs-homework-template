const { User } = require("../../models");
const path = require("path");
// const fs = require("fs/promises");
const jimp = require("jimp");

// path to avatar folder
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  // getting an ID of user who is adding an avatar
  const { _id } = req.user;

  // getting avatar from temp folder
  const { path: tmpUpload, originalname } = req.file;

  // making an unique filename
  const filename = `${_id}_${originalname}`;

  // path where avatar should be saved
  const resultUpload = path.join(avatarsDir, filename);

  // resizing avatar using jimp
  await jimp
    .read(tmpUpload)
    .then((image) => {
      image.resize(250, 250).write(`${resultUpload}`);
    })
    .catch((error) => {
      console.log(error.message);
    });

  // if we don't need to resize we can act using fs.rename for moving from temporary folder to permanent one by renaming the pass
  //  await fs.rename(tmpUpload, resultUpload);

  // saving permanent path of the new avatar to the DB
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL: "тут буде посилання на зображення" });
};

module.exports = updateAvatar;
