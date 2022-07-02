const cloudinary = require('cloudinary');
const { unlink } = require('fs/promises');
const { promisify } = require('util');
const { CLOUD_FOLDER_AVATAR } = require('../../libs/constants');
const { repositoryUsers } = require('../../repository');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

class CloudinaryStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filePath = file.path;
    this.idAvatarCloud = user.idAvatarCloud;
    this.folderAvatars = CLOUD_FOLDER_AVATAR;
    this.uploadCloud = promisify(cloudinary.v2.uploader.upload);
  }

  async saveAvatar() {
    const { public_id: returnedIdAvatarCloud, secure_url: avatarURL } = await this.uploadCloud(this.filePath, {
      public_id: this.idAvatarCloud,
      folder: this.folderAvatars,
    });
    const newIdAvatarCloud = returnedIdAvatarCloud.replace(`${this.folderAvatars}/`, '');
    await repositoryUsers.updateAvatar(this.userId, avatarURL, newIdAvatarCloud);
    // await User.findByIdAndUpdate({ _id: this.userId }, { avatarURL, idAvatarCloud: newIdAvatarCloud });
    await this.removeUploadFile(this.filePath);

    return avatarURL;
  }

  async removeUploadFile(filePath) {
    try {
      await unlink(filePath);
    } catch (error) {
      console.error(error.message);
    }
  }
}
module.exports = CloudinaryStorage;
