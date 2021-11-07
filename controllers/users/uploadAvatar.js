const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempDir, originlname } = req.file;
  const [extension] = originlname.split('.').reverse();
  const filename = `${_id}_main-image.${extension}`;
  const uploadDir = path.join(__dirname, '../../', 'piblic//avatar', filename);
  try {
    await fs.rename(tempDir, uploadDir);
    const image = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL: image });
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Update avatar success',
    });
  } catch (error) {
    await fs.unlink(tempDir);
    next(error);
  }
};

module.exports = updateAvatar;
