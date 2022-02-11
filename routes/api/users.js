const express = require('express');
const authenticate = require('../../midlewares/authenticate');
const upload = require('../../midlewares/validation/upload');
const { User } = require('../../models/user');
const router = express.Router();
const path = require('path');
const fs = require('fs/promises');
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

router
  .get('/current', authenticate, async (req, res, next) => {
    res.json({
      email: req.user.email,
    });
  })
  .get('/logout', authenticate, async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).send();
  })
  .patch('/avatars', authenticate, upload.single('avatar'), async (req, res, next) => {
    const { id } = req.user;
    const { path: tempUpload, filename } = req.file;
    try {
      const [extention] = filename.split('.').reverse();
      const newFileName = `${id}.${extention}`;
      const resultUpload = path.join(avatarsDir, newFileName);
      await fs.rename(tempUpload, resultUpload);
      const avatarURL = path.join('avatars', newFileName);
      await User.findByIdAndUpdate(id, { avatarURL });
      res.json({
        avatarURL,
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
