import express from 'express';
import multer from 'multer';

import verifyToken from '#middleware/authMiddleware.js';
import { updateAvatar } from '#controllers/avatarController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.patch(
  '/avatars',
  verifyToken,
  upload.single('avatar'),
  async (req, res) => {
    try {
      console.log('Received request to update avatar:', req.file);

      const userId = req.user._id;

      if (!req.file) {
        console.error('No file data in the request');
        return res.status(400).json({ message: 'No file data in the request' });
      }

      const fileBuffer = req.file.buffer;

      const updatedAvatarURL = await updateAvatar(userId, fileBuffer);

      res.status(200).json({ avatarURL: updatedAvatarURL });
    } catch (error) {
      console.error('Error updating avatar:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default router;
