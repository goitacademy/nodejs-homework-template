const service = require('../../services');
const path = require('path');
const fs = require('fs/promises');
const { v4 } = require('uuid');
const Jimp = require('jimp');

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const { user, file } = req;
  const avatarURL = await saveAvatar({ user, file });

  try {
    await service.user.updateById(id, { avatarURL });

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const saveAvatar = async (req, res, next) => {
  const { id, avatarURL } = req.user;
  const avatarId = v4();
  const { path: tempName, originalname } = req.file;
  const uploadDir = path.join(process.cwd(), 'public/avatars');
  const userDirectory = path.join(uploadDir, id);
  const newNameAvatar = `${avatarId}_${originalname}`;
  const fileName = path.join(userDirectory, newNameAvatar);
  const image = await Jimp.read(tempName);

  const isAccessible = path => {
    return fs
      .access(path)
      .then(() => true)
      .catch(() => false);
  };

  const createDir = async path => {
    if (!(await isAccessible(path))) {
      await fs.mkdir(path);
    }
  };

  const removeAvatar = async path => {
    if (await isAccessible(path)) {
      await fs.unlink(path);
    }
  };

  try {
    await createDir(userDirectory);

    await image.resize(256, 256).write(fileName);
    await fs.unlink(tempName);
    await removeAvatar(avatarURL);

    return fileName;
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = updateAvatar;