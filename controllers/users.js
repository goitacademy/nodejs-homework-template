const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ code: 200, data: { result } });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);

  const file = await Jimp.read(resultUpload);
  const fileResize = await file.resize(250, 250);
  await fileResize.write(resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
