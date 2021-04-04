const UserRepository = require("../repository/usersRepository");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs").promises;
class UserService {
  constructor() {
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.ClOUD_API_SECRET,
    });
    this.repositories = { users: new UserRepository() };
  }

  async create(body) {
    const data = await this.repositories.users.addUser(body);

    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findUserByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findUserById(id);
    return data;
  }

  async updateAvatar(id, pathFile) {
    try {
      const {
        secure_url: avatar,
        public_id: idCloudeAvatar,
      } = await this.#uploadCloud(pathFile);
      const oldAvatar = await this.repositories.users.getAvatar(id);
      this.cloudinary.uploader.destroy(
        oldAvatar.idCloudeAvatar,
        (err, result) => {
          console.log(err, result);
        }
      );
      await this.repositories.users.updateAvatar(id, avatar, idCloudeAvatar);
      await fs.unlink(pathFile);
      return avatar;
    } catch (err) {
      throw new ErrorHandler(null, "Error upload avatar");
    }
  }
  #uploadCloud = (pathFile) => {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload(
        pathFile,
        {
          folder: "Avatars",
          transformation: {
            width: 250,

            crop: "fill",
          },
        },
        (error, result) => {
          if (error) reject(error);
          if (result) resolve(result);
        }
      );
    });
  };
}

module.exports = UserService;
