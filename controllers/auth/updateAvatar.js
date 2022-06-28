const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { User } = require('../../models/user');
const avatarsDir = path.join(__dirname,'../../', 'public','avatars')

const updateAvatar = async (req, res) => {
   try {
      const { _id: id } = req.user;
      const { filename, path: tmpPath } = req.file;
      const [extension] = filename.split('.').reverse();
      const name = `${id}.${extension}`;
      const newDir = path.join(avatarsDir, name);
      const avatar = await Jimp.read(tmpPath);
      await avatar.resize(250,250).writeAsync(tmpPath)
      await fs.rename(tmpPath, newDir);
      const avatarURL = path.join('avatars', name);
      const result = await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
      res.json({
         avatarURL: result.avatarURL
      });
   } catch (error) {
      if (error.message('not such file')) {
         await fs.unlink(req.file.path);
      }
      throw error;
   }
}

module.exports = updateAvatar;