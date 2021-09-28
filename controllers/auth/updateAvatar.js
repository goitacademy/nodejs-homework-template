const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { User } = require('../../models');

const usersDir = path.join(process.cwd(), 'public/avatars');

const updateAvatar = async (req, res) => {
  const id = req.user.id;
  const { path: tempPath, originalname } = req.file;
  const uploadPath = path.join(usersDir, `${id}_${originalname}`);

  try {
    const file = await Jimp.read(tempPath);

    await file.resize(250, 250).write(tempPath);
    await fs.rename(tempPath, uploadPath);

    const image = `/avatars/${id}_${originalname}`;
    const user = await User.findOneAndUpdate(id, { avatarURL: image });

    if (!user) {
      res.json({
        status: 'Unauthorized',
        code: 401,
        data: {
          message: 'Not authorized',
        },
      });
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: image,
      },
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = updateAvatar;
