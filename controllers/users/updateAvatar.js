
const jimp = require('jimp');
const path = require('path');

const updateAvatar = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const avatarPath = path.join(process.cwd(), 'public', 'avatars', `${req.user._id}.jpg`);
    const image = await jimp.read(req.file.buffer); 
    await image.resize(250, 250).writeAsync(avatarPath); 
    req.user.avatarURL = `/avatars/${req.user._id}.jpg`;
    await req.user.save();
    return res.status(200).json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = updateAvatar;
