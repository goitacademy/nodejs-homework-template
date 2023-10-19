const express = require('express');
const router = express.Router();
const multer = require('multer');
const jimp = require('jimp');
const fs = require('fs');
const User = require('../../models/users');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.patch(
  '/avatars',
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { file } = req;
      if (!file) {
        return res.status(400).json({ message: 'Please specify an avatar file' });
      }

      const image = await jimp.read(file.buffer);
      await image.resize(250, 250);
      const avatarBuffer = await image.getBufferAsync(jimp.MIME_JPEG);

      const uniqueFileName = `${user._id}-${Date.now()}.jpg`;

      const avatarPath = `public/avatars/${uniqueFileName}`;
      fs.writeFileSync(avatarPath, avatarBuffer);

      user.avatarURL = `/avatars/${uniqueFileName}`;
      await user.save();

      res.json({ avatarURL: user.avatarURL });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
