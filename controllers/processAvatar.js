import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index";

import { HttpError } from "../helpers/index.js";

import Jimp from "jimp";

import path from "path";

import fs from "fs/promises";

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const processAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;

    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const image = await Jimp.read(resultUpload);
    await image.resize(Jimp.AUTO, 250).writeAsync(resultUpload);

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }

    next(HttpError(500, "Server error"));
  }
};

export default {
  processAvatar: ctrlWrapper(processAvatar),
};
