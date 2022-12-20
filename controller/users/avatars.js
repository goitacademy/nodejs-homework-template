const service = require('../../services/index');

const path = require('path');
const convertingAvatars = require('../../services/convertingAvatars');
const fs = require('fs').promises;

require('dotenv').config();

const avatars = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const { id } = req.user;

  const extension = originalname.split('.').reverse()[0];
  const newName = `${id}.${extension}`;
  const newPathAvatar = path.join(__dirname, '../public/avatars/', newName);

  try {
    await convertingAvatars({ tempDir });

    await fs.rename(tempDir, newPathAvatar);

    const { avatarURL } = await service.updateAvatar({
      id,
      avatarURL: `/avatars/${newName}`,
    });

    res.status(200).json({ avatarURL });
  } catch (error) {
    fs.unlink(tempDir);

    res.status(400).json({ message: error.message });
  }
};

module.exports = avatars;
