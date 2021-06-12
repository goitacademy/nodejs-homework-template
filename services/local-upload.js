const jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
// const createFolderIfNotExist = require("../helpers/create-folder");

class UploadAvatartService {
  constructor(avatarDir) {
    this.avatarDir = avatarDir;
  }

  async transformAvatar(pathFile) {
    const avatar = await jimp.read(pathFile);
    await avatar
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile);
  }

  async saveAvatar({ idUser, file }) {
    await this.transformAvatar(file.path);
    const userAvatarFolder = path.join(this.avatarDir, idUser);
    // await createFolderIfNotExist(userAvatarFolder);
    await fs.rename(file.path, path.join(userAvatarFolder, file.filename));
    return path.normalize(path.join(idUser, file.filename));
  }
}

module.exports = UploadAvatartService;
