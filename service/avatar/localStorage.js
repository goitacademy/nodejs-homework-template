const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models');

const localStorage = async (file, user) => {
  const { id } = user;
  const { path: tempFilePath, originalname } = file;

  const avatarsDirectory = path.join(
    process.cwd(),
    process.env.STATIC_FOLDER,
    process.env.AVATARS_FOLDER,
  );
  const destination = path.join(avatarsDirectory, id);
  await fs.mkdir(destination, { recursive: true });

  const avatarName = `${id}_${Date.now()}_${originalname}`;
  await fs.rename(tempFilePath, path.join(destination, avatarName));

  const avatarURL = path.normalize(path.join(id, avatarName));
  await User.findByIdAndUpdate(id, { avatarURL });

  return avatarURL;
};

module.exports = localStorage;
