// const cloudinary = require("cloudinary").v2;
const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");
const { unlink } = require("fs/promises");
const Users = require("../../repository/users");
const { FOLDER_CLOUD_AVATAR } = require("../../libs/constant");

cloudinary.config({
  cloud_name: "goitnode",
  api_key: "326488457974591",
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
      folder: FOLDER_CLOUD_AVATAR,
    });
    const { public_id: cloudId, secure_url: urlOfAvatar } = response;
    await Users.updateAvatar(
      this.user.id,
      urlOfAvatar,
      cloudId.replace(`${FOLDER_CLOUD_AVATAR}/`, "")
    );
    try {
      await unlink(this.file.path);
    } catch (error) {
      // TODO: add logger
      console.error(error);
    }
    return urlOfAvatar;
  }
}

module.exports = CloudStorage;
