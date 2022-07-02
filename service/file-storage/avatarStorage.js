const Jimp = require('jimp');

class AvatarStorage {
  constructor(Storage, file, user) {
    this.storage = new Storage(file, user);
    this.pathFile = file.path;
  }

  async newAvatars() {
    await this.transformAvatar(this.pathFile);
    const userUrlAvatar = await this.storage.saveAvatar();
    return userUrlAvatar;
  }

  async transformAvatar(pathFile) {
    const image = await Jimp.read(pathFile);
    await image
      .autocrop()
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
      .resize(250, 250)
      .quality(60)
      .writeAsync(pathFile);
  }
}

module.exports = AvatarStorage;
