// const {  } = require("jimp");
const path = require('path');
const fs = require('fs').promises;
const jimp = require('jimp');

const avatarsDir = path.resolve('./public/avatars');

const avatarUpdater = async (req, res) => {
  console.log('req.file', req.file);
  console.log('req.body', req.body);
  if (req.file) {
    const { file } = req;
    const ava = await jimp.read(file.path);
    ava
      .autocrop()
      .cover(
        250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path);
    ava.resize(250, 250).writeAsync(file.path);
    await fs.rename(file.path, path.join(avatarsDir, file.originalname));
  }

  res.status(200).json({ message: 'file upload' });
};

module.exports = {
  avatarUpdater,
};
