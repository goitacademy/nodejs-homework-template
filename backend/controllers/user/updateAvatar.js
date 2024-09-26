const path = require('path');
const fs = require('fs/promises');

const avatarDir = path.join(__dirname, '../', '../', 'public', 'avatars');
const Jimp = require('jimp');

const { User } = require('../../models/userModel');
const expressAsyncHandler = require('express-async-handler');

const updateAvatar = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarUrl = path.join('avatars', filename);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  Jimp.read(`${avatarDir}/${filename}`, (err, fileAvatar) => {
    if (err) throw err;
    fileAvatar.cover(250, 250).quality(60).write(`${avatarDir}/${filename}`);
  });

  res.json({ avatarUrl });
});

module.exports = updateAvatar;