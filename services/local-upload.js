const jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

class UploadAvatarService {
  constructor(folderAvatars) {
    this.folderAvatars = folderAvatars;
  }

  async transformAvatar(pathFile) {
    const pic = await jimp.read(pathFile);
    await pic
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }

  async saveAvatar({ file }) {
    await this.transformAvatar(file.path);
    await fs.rename(file.path, path.join(this.folderAvatars, file.filename));
    return path.normalize(path.join(this.folderAvatars, file.filename));
  }
}

module.exports = UploadAvatarService;
