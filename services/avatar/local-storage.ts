const path = require("path");
const fs = require("fs").promises;
const { updateAvatar } = require("../../repository/users");
require("dotenv").config();

class LocalStorage {
  file: any;
  user: any;
  static: any;
  constructor(file, user) {
    this.file = file;
    this.user = user;
    this.static = process.env.STATIC_FOLDER;
  }

  async save() {
    const destination = path.join(this.static, "avatars", this.user.id); // создаем папку public/avatars и в ней папку юзера
    await fs.mkdir(destination, { recursive: true });
    await fs.rename(this.file.path, path.join(destination, this.file.filename)); // переносим из папки upload-tmp в созданную папку для юзера
    const urlOfAvatar = path.normalize(
      path.join("avatars", this.user.id, this.file.filename)
    );
    await updateAvatar(this.user.id, urlOfAvatar);
    return urlOfAvatar;
  }
}

module.exports = LocalStorage;
