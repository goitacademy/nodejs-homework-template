import express from "express";
import multer from "multer";
import jimp from "jimp";
import path from "path";
import fs from "fs/promises";
import { HttpError } from "../../helpers/index.js";
import User from "../../models/User.js";

const router = express.Router();

// Використовуйте абсолютний шлях до кореневої папки проекту
const uploadDir = path.join(process.cwd(), "tmp");
const avatarsDir = path.join(process.cwd(), "public", "avatars");

fs.mkdir(uploadDir, { recursive: true });

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.patch("/avatars", upload.single("avatar"), async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw HttpError(401, "Not authorized");
      }
  
      const { buffer, originalname } = req.file;
  
      // Зберігаємо буфер у файл
      const fileName = `${Date.now()}_${originalname}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      // Читаємо файл і створюємо Jimp-зображення
      const image = await jimp.read(filePath);
      await image.cover(250, 250).writeAsync(filePath);
  
      const avatarPath = path.join(avatarsDir, fileName);
      await fs.rename(filePath, avatarPath);
  
      const { _id: userId } = req.user;
      const avatarURL = `/avatars/${fileName}`;
      await User.findByIdAndUpdate(userId, { avatarURL });
  
      res.status(200).json({ avatarURL });
    } catch (error) {
      next(error);
    }
  });

export default router;
