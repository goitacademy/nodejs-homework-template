const path = require("path");
const fs = require("fs/promises");
const Users = require("../../repository/users");

class LocalStorage {
  constructor(file, user) {
    this.file = file;
    this.user = user;
    this.static = process.env.STATIC_FOLDER;
  }

  async save() {
    const destination = path.join(this.static, this.user.id);
    await fs.mkdir(destination, { recursive: true });
    await fs.rename(this.file.path, path.join(destination, this.file.filename));
    const urlOfAvatar = path.normalize(
      path.join(this.user.id, this.file.filename)
    );
    await Users.updateAvatar(this.user.id, urlOfAvatar);
    return urlOfAvatar;
  }
}

module.exports = LocalStorage;
