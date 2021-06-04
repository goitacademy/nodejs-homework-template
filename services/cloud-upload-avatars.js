const fs = require('fs/promises');

class Upload {
  constructor(uploadCloud) {
    this.uploadCloud = uploadCloud;
  }

  async saveAvatarToCloud({ pathFile, userIdImg }) {}

  async deleteTempFile(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = Upload;
