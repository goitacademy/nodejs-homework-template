const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

async function updateByAvatar(req, res, next) {
  const { _id } = req.user;

  const userId = await User.findById({ _id });
  if (!userId) {
    throw RequestError(401, "Not authorized");
  }

  const { path: tmpPath, originalname } = req.file;

  try {
    const avatarName = `${_id}.${originalname}`;
    const avatarJimp = await Jimp.read(tmpPath);
    await avatarJimp.resize(250, 250).write(tmpPath);

    const publicPath = path.join(
      __dirname,
      "../../",
      "public",
      "avatars",
      avatarName
    );

    await fs.rename(tmpPath, publicPath);
    const avatarURL = path.join("public", "avatars", avatarName);
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    return res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
}

module.exports = { updateByAvatar };
