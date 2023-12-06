import { Request, Response } from "express";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { User, IUser } from "../../models/user/user";

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req: Request, res: Response) => {
  const { _id }: IUser = req.user as IUser;

  const { path: tempUpload, originalname }: Express.Multer.File =
    req.file as Express.Multer.File;

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
