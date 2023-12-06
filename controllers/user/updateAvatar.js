import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { fileURLToPath } from "url";
import { User } from "../../models/user/user.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const avatarsDir = path.join(dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  Jimp.read(tempUpload, (err, avatar) => {
    if (err) throw err;

    avatar.resize(250, 250).write(resultUpload);
  });

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default updateAvatar;
