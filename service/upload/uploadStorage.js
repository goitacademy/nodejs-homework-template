// import Jimp from "jimp/*";

class FileStorage {
  constructor(Storage, file, user) {
    this.Storage = new Storage(file, user);
    this.pathFile = file.path;
  }

  async updateAvatar() {}

  async transformAvatar(pathFile) {}
}

export default FileStorage;
