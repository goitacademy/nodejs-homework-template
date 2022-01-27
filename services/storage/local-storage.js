import path from 'path';
import fs from 'fs/promises';
import UserRepository from '../../rep/users';

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.fileName = file.filename;
    this.filePath = file.path;
    this.folderAvatar = process.env.FOLDER_FOR_AVATARS;
  }

  async save() {
    const destination = path.join('public', this.folderAvatar, this.userId);
    await fs.mkdir(destination, { recursive: true });
    await fs.rename(this.filePath, path.join(destination, this.fileName));
    const avatarUrl = await path.normalize(
      path.join(this.folderAvatar, this.userId, this.fileName),
    );
    await UserRepository.updateAvatar(this.userId, avatarUrl);
    return avatarUrl;
  }
}

export default LocalStorage;