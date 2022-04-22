const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');
const { unlink } = require('fs/promises');
const Users = require('../../repository/users');
const { FOLDER_CLOUD_AVATARS } = require('../../libs/constants');

cloudinary.config({
  cloud_name: 'dj0rcb35d',
  api_key: '788279384915754',
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

class CloudStorage {
  constructor(file, user) {
    this.file = file;
    this.user = user;
    this.uploadToCloud = promisify(cloudinary.uploader.upload);
  }

  async save() {
    const response = await this.uploadToCloud(this.file.path, {
      public_id: this.user.cloudId,
      folder: FOLDER_CLOUD_AVATARS,
    })
    const { public_id: cloudId, secure_url: urlOfAvatar } = response;
    await Users.updateAvatar(
      this.user.id,
      urlOfAvatar,
      cloudId.replace(`${FOLDER_CLOUD_AVATARS}/`, ''),
    );
    try {
      await unlink(this.file.path);
    } catch (error) {
      console.error(error);
    }

    return urlOfAvatar;
  }
}

module.exports = CloudStorage