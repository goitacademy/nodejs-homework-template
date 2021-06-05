const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const createFolder = require("../helpers/create-dir");

class Upload {
  constructor(AVATARS_OF_USERS) {
    this.AVATARS_OF_USERS = AVATARS_OF_USERS;
  }

  async transformAvatar(pathFile) {
    const file = await Jimp.read(pathFile);
    await file
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }

  async saveAvatarToStatic({ idUser, pathFile, name, oldFile }) {
    // console.log("PATHFILE", pathFile, "\n\n");
    try {
      await this.transformAvatar(pathFile);
      const folderUserAvatar = path.join(this.AVATARS_OF_USERS, idUser);
      await createFolder(folderUserAvatar);
      await fs.rename(pathFile, path.join(folderUserAvatar, name));

      const avatarUrl = path.normalize(path.join(idUser, name));

      const oldFilePath = path.join(
        process.cwd(),
        this.AVATARS_OF_USERS,
        oldFile
      );
      // const oldFilePath = path.join(
      //   process.cwd(),
      //   this.AVATARS_OF_USERS,
      //   idUser,
      //   pathFile.split("/")[1]
      // );
      await this.deleteOldAvatar(oldFilePath);
      return avatarUrl;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOldAvatar(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Upload;
