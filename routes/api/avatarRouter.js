import express from "express";
import fs from "fs/promises";
import path from "path";
import jimp from "jimp";
import upload from "../middlewares/upload.js";
import authenticate from "../middlewares/authenticate.js";
import { UserModel } from "../../schemas/user.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";

const router = express.Router();


router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
   
      const user = await UserModel.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

 
      if (!req.file) {
        return res.status(400).json({ message: "Please upload a file" });
      }


      const { filename } = req.file;
      const image = await jimp.read(path.join(uploadDirectory, filename));
      await image
        .cover(250, 250)
        .writeAsync(path.join(avatarsDirectory, filename));
      await fs.unlink(path.join(uploadDirectory, filename));


      const avatarURL = `/avatars/${filename}`;
      user.avatarURL = avatarURL;
      await user.save();


      res.json({ avatarURL });
    } catch (error) {
      next(error);
    }
  }
);

const ctrlAvatar = ctrlWrapper(router);
 export default ctrlAvatar;

