const Jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');
const User = require('../models/user');
const upload = require('../middleware/uploads');

const updateAvatar = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const filePath = req.file.path;
    const publicDir = path.join(__dirname, '..', 'public', 'avatars');
    const fileName = `${req.user.id}-${req.file.filename}`;
    const finalPath = path.join(publicDir, fileName);

    const image = await Jimp.read(filePath);
    await image.resize(250, 250).writeAsync(finalPath);

    await fs.unlink(filePath);

    const avatarURL = `/avatars/${fileName}`;
    req.user.avatarURL = avatarURL;
    await req.user.save();

    res.json({ avatarURL });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateAvatar };
