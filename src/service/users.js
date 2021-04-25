const { UsersRepository } = require("../repository");
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const { ErrorHandler } = require("../helpers/errorHandler");
require("dotenv").config();

class UsersService {
  constructor() {
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    this.repositories = { users: new UsersRepository() };
  }

  async create(body) {
    const data = await this.repositories.users.create(body);
    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async findByToken(token) {
    const { subscription, email } = await this.repositories.users.findByToken(
      token
    );
    return { subscription, email };
  }

  async update(id, body) {
    const { subscription, email } = await this.repositories.users.update(
      id,
      body
    );
    return { subscription, email };
  }

  async updateAvatar(id, pathFile) {
    try {
      const objCloud = await this.#uploadCloud(pathFile);
      const { secure_url: avatarURL, public_id: idCloudAvatar } = objCloud;

      //получаем и чистим старую аватарку у пользователя
      const oldAvatar = await this.repositories.users.getAvatar(id);

      if (oldAvatar.idCloudAvatar) {
        this.cloudinary.uploader.destroy(
          oldAvatar.idCloudAvatar,
          (err, result) => {
            console.log(err, result);
          }
        );
      }

      //записываем новую аватарку
      await this.repositories.users.updateAvatar(id, avatarURL, idCloudAvatar);

      //удаляем временный файл с диска
      await fs.unlink(pathFile);
      return avatarURL;
    } catch (error) {
      throw new ErrorHandler(null, "Error upload avatar to cloud");
    }
  }

  //делаем обертку так как cloudinary не создает промисы
  //folder: :'avatars  -  путь к папке на сервисе cloudinary
  //{ width: 250, crop: "fill" } - образаем при загрузке в облако
  #uploadCloud = (pathFile) => {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload(
        pathFile,
        { folder: "avatars", transformation: { width: 250, crop: "fill" } },
        function (error, result) {
          if (error) reject(error);
          if (result) resolve(result);
        }
      );
    });
  };
}

module.exports = UsersService;
