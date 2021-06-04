const fs = require('fs/promises');
const Jimp = require('jimp');
const path = require('path');

const createFolderIsNotExist = require('../helpers/create-dir');

class Upload {
  constructor(USER_AVATARS) {
    this.USER_AVATARS = USER_AVATARS;
  }

  async transformAvatar(pathFile) {
    const file = await Jimp.read(pathFile);
    await file
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }

  async saveAvatarToStatic({ idUser, pathFile, name, oldFile }) {
    await this.transformAvatar(pathFile);
    const folderUserAvatar = path.join(this.USER_AVATARS, idUser);
    await createFolderIsNotExist(folderUserAvatar);
    await fs.rename(pathFile, path.join(folderUserAvatar, name));
    await this.deleteOldAvatar(
      path.join(process.cwd(), this.USER_AVATARS, oldFile)
    );
    const avatarUrl = path.normalize(path.join(idUser, name));
    return avatarUrl;
  }

  async deleteOldAvatar(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = Upload;
