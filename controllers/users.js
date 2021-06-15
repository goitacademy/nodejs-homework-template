const fs = require("fs/promises");
const path = require("path");

const Users = require("../repositories/users");
const { HttpCode } = require("../helpers/constants");
const jwt = require("jsonwebtoken");
// const upload = require("../helpers/upload");

require("dotenv").config();

const UploadAvatarService = require("../services/local-upload"); // подключение файла для локальной загрузки аватарок локально

// const UploadCloadAvatarService = require("../services/cloud-upload"); // подключение файла для загрузки аватарок из облака cloudinary

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email in use",
      });
    }
    const { id, email, subscription, avatar } = await Users.createUser(
      req.body
    );

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { id, email, subscription, avatar },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await Users.updateToken(id, token);

    return res.json({ status: "success", code: HttpCode.OK, data: { token } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;

    await Users.updateToken(id, null);

    return res.status(HttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.user.id;

    if (req.body) {
      const user = await Users.updateUserSubscription(id, req.body);

      const { email, subscription } = user;

      if (user) {
        return res.status(HttpCode.OK).json({
          status: "success",
          code: HttpCode.OK,
          data: { email, subscription },
        });
      }
      return res.json({ status: "error", code: 404, message: "Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

// вариант, когда аватарки сохраняются локально
const avatars = async (req, res, next) => {
  try {
    const id = req.user.id; // получаем id пользователя, который также нужен и для quard

    const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS); // создаем класс, и указываем куда, в какую папку service должен сохранять аватарки

    const avatarURL = await uploads.saveAvatar({ idUser: id, file: req.file }); // получаем URL - путь, где хранится ссылка, путь к нашему файлу, и он принимает объект c id пользователя, чтобы складывать его аватарки в его папку; и также общий файл с информацией о файле -  req.file - мало ли что может потом понадобиться . Специфика этого URL в том, что он должен храниться в базе данных

    // удаление старой аватарки, если загружается новая
    try {
      await fs.unlink(path.join(process.env.AVATAR_OF_USERS, req.user.avatar)); // ccылка на аватарку лежит на gravatar. Указываем req.user.avatar - относительный путь к аватарке. Первый раз при удалении старой аватарки, если есть ссылка на gravatar будет ошибка, обрабатываем ее в catch.
    } catch (error) {
      console.log(error.message);
    }

    await Users.updateAvatar(id, avatarURL);

    res.json({
      status: "success",
      code: HttpCode.OK,
      data: { avatarURL },
    });
  } catch (error) {
    next(error);
  }
};

// // вариант, когда аватарки сохраняются в облаке cloudinary
// const avatars = async (req, res, next) => {
//   try {
//     const id = req.user.id; // получаем id пользователя, который также нужен и для quard

//     const uploads = new UploadCloadAvatarService(); // создаем класс, и указываем куда, в какую папку service должен сохранять аватарки

//     const { idCloudAvatar, avatarURL } = await uploads.saveAvatar(
//       req.file.path,
//       req.user.idCloudAvatar
//     ); // нужно передать место, где лежит файл. Из upload нужно отправить аватарку в облако и удалить старую аватарку

//     // удаление файл из папки uploads, если загружается новая аватарка
//     await fs.unlink(req.file.path);

//     await Users.updateAvatar(id, avatarURL, idCloudAvatar);

//     res.json({
//       status: "success",
//       code: HttpCode.OK,
//       data: { avatarURL },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = { signup, login, logout, currentUser, update, avatars };
