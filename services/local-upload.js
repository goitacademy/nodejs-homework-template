const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

class UploadAvatarService {
  constructor(avatarDir) {
    this.avatarDir = avatarDir;
  }

  async transformAvatar(imgPath) {
    const avatar = await Jimp.read(imgPath);
    await avatar.cover(250, 250).normalize().writeAsync(imgPath);
  }

  async saveAvatar({ file }) {
    await this.transformAvatar(file.path);

    const finalAvatarFolder = path.join("public", this.avatarDir);
    await fs.rename(file.path, path.join(finalAvatarFolder, file.filename));
    return path.normalize(path.join(this.avatarDir, file.filename));
  }
}

module.exports = UploadAvatarService;
