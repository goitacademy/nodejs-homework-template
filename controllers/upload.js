const jimp = require('jimp');

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadAvatar = async (req, res, next) => {
  try {
    const user = req.user;
    if (!req.file) {
      return res.json({
        status: 'failed',
        code: 404,
        message: 'File not found...',
      });
    }
    const image = await jimp.read(req.file.path);
    await image.resize(250, 250);
    const filename = `${uuidv4()}-${Date.now()}.${path.extname(
      req.file.originalname
    )}`;
    await image.writeAsync(
      path.join(__dirname, '..', '..', 'public', 'avatar', filename)
    );
    user.avatarUrl = `/avatars/${filename}`;
    await user.save();
    fs.unlinkSync(req.file.path);
    return res.json({
      status: 'success',
      code: 200,
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadAvatar };
