import fs from "fs/promises";
import path from "path";
import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorator/index.js";
import { HttpError, imageResize } from "../../helpers/index.js";

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;

  const newPath = path.join(avatarPath, fileName);

  await fs.rename(tempUpload, newPath);
  imageResize(newPath);
  const avatarURL = path.join("avatars", fileName);

  const newAvatar = await User.findByIdAndUpdate(_id, { avatarURL });
  if (!newAvatar) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.status(200).json({ avatarURL: newAvatar.avatarURL });
};

export default ctrlWrapper(updateAvatar);
