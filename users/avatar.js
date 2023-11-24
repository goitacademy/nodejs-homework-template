import fs from 'fs';
import path from 'path';
import jimp from 'jimp';
import multer from 'multer';
import express from 'express';
import { dirname } from 'path';
import gravatar from 'gravatar';
import { fileURLToPath } from 'url';

import userModel from '../models/userModel.js';
import verifyToken from '../middleware/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.patch(
  '/avatars',
  verifyToken,
  upload.single('avatar'),
  async (req, res) => {
    try {
      console.log('Received request to update avatar:', req.file);

      const userId = req.user._id;
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const { email } = req.user;
      const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

      if (!req.file) {
        console.error('No file data in the request');
        return res.status(400).json({ message: 'No file data in the request' });
      }

      const fileBuffer = req.file.buffer;

      const image = await jimp.read(fileBuffer);
      await image.resize(250, 250);
      const processedBuffer = await image.getBufferAsync(jimp.MIME_JPEG);

      const uniqueFileName = `${userId}-${Date.now()}.jpg`;

      const tempAvatarPath = path.join(__dirname, '../tmp', uniqueFileName);
      await image.writeAsync(tempAvatarPath);

      const avatarPath = path.join(
        __dirname,
        '../public/avatars',
        uniqueFileName
      );
      await image.writeAsync(avatarPath);
      fs.unlinkSync(tempAvatarPath);

      user.avatarURL = `/avatars/${uniqueFileName}`;
      await user.save();

      res.status(200).json({ avatarURL: user.avatarURL });
    } catch (error) {
      console.error('Error updating avatar:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default router;
