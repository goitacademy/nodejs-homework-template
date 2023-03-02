const fs = require('fs/promises');
const path = require('path');
const { HttpError, HttpSuccess, resizeImage } = require('../../helpers');
const avatarDir = path.join(__dirname, '..', '..', 'public/avatars');
const { User } = require('../../models');

const addAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  const { id } = req.user;
  const name = `${id}_${originalname}`;
  const resultUpload = path.join(avatarDir, name);

  await resizeImage(tempUpload, 400, 400);
  try {
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join('public', 'avatars', name);

    const result = await User.findByIdAndUpdate(
      id,
      { avatarUrl },
      { new: true }
    );

    if (!result) {
      throw HttpError({ status: 404, message: "Can't update avatar" });
    }

    res.json({ data: { avatarUrl } });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw HttpError({ status: 400, message: 'Failed to update avatar' });
  }
};
module.exports = addAvatar;
