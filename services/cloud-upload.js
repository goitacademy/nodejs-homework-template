// работа с cloudinary sdk node.js. sdk - это набор библиотек для работы
const cloudinary = require("cloudinary").v2;

const { promisify } = require("util"); // пакет node.js

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

const uploadCloud = promisify(cloudinary.uploader.upload); // promisify - это обертка, которая принимает любую функцию как callback и после этого она начинает работать как promise; cloudinary.uploader.upload - это из документации

class UploadCloadAvatarService {
  async saveAvatar(pathFile, oldIdCloudAvatar) {
    // достаем из документации часть ключей, которые нам нужны из того что возвращается, пробрасываем pathFile, и объект, в котором можем передавать данные
    const { public_id: idCloudAvatar, secure_url: avatarURL } =
      await uploadCloud(pathFile, {
        public_id: oldIdCloudAvatar?.replace("UserAvatars/", ""), // "UserAvatars/public_id" - папка, где в cloudinary храним аватарки пользователей. Чтобы не было рекурсии, когда файл возвращается часть названия UserAvatars - нужно выкидывать

        folder: "UserAvatars",
        transformation: { width: 250, height: 250, crop: "pad" },
      });

    console.log(pathFile);

    return { idCloudAvatar, avatarURL };
  }
}

module.exports = UploadCloadAvatarService;
