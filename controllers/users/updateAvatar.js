const fs = require('fs/promises');
const path = require('path');
const { user: service } = require('../../services');
const imageNormalize = require('../../utils/imageNormalize');

const updateAvatar = async (req, res, next) => {
  const userId = req.user._id.toString();
  if (!req.file) {
    return res.status(400).json({
      status: 'Error',
      code: 400,
      error: 'no file attached',
    });
  }
  const { path: tempFileName } = req.file;
  const uploadDir = path.join(process.cwd(), 'public/avatars');

  try {
    const fileName = path.join(uploadDir, `${userId}.jpg`);
    await imageNormalize(tempFileName);

    const result = await service.updateById(userId, {
      avatarURL: `http://localhost:3003/avatars/${userId}.jpg`,
    });
    await fs.rename(tempFileName, fileName);

    res.status(200).json({
      status: 'Success',
      code: 200,
      data: result,
    });
  } catch (error) {
    fs.unlink(tempFileName);
    next(error);
  }
};

module.exports = updateAvatar;