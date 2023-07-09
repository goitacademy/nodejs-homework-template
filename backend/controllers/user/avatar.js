const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/userModel');
const asyncHandler = require("express-async-handler");

const avatarDir = path.join(__dirname, '../', '../', 'public', 'avatars');

const avatar = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  console.log(_id);

  res.status(200).json({
    avatarURL,
  });
});

module.exports = avatar;