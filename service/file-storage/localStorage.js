const path = require('path');
const fs = require('fs/promises');
const { repositoryUsers } = require('../../repository');
const { PUBLIC_DIR_AVATARS } = require('../../libs/constants');

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filename = file.filename;
    this.filePath = file.path;
    this.folderAvatars = PUBLIC_DIR_AVATARS;
  }

  async saveAvatar() {
    const destination = path.join(this.folderAvatars, this.userId);
    await fs.mkdir(destination, { recursive: true });
    await fs.rename(this.filePath, path.join(destination, this.filename));
    const avatarURL = path.normalize(path.join(this.userId, this.filename));
    await repositoryUsers.updateAvatar(this.userId, avatarURL);
    return avatarURL;
  }
}
module.exports = LocalStorage;
