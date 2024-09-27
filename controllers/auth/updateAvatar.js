const { User } = require('../../models/user');
const path = require('path');
const avatarDir = path.join(__dirname, '../', '../', 'public', 'avatars');
const { ctrlWrapper } = require('../../helpers');
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUploud, originalname } = req.file;
 
  const fileName = `${_id}_${originalname}`;
  const result = path.join(avatarDir, fileName);

 Jimp.read(tempUploud, (err, image) => {
    if (err) throw err;
   return image.resize(250, 250).write(result) 
  });
//   const fs = require('fs/promises');
//   await fs.rename(tempUploud, result);
  const avatarURL = path.join('avatars', fileName);
  await User.findOneAndUpdate(_id, { avatarURL });
  res.status(200).json({
    avatarURL,
  });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
