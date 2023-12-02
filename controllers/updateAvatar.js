// controllers/updateAvatar.js
const jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const updateAvatar = async (req, res) => {
  try {
    // Проверяем, что req.file существует и имеет свойство path
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Выводим в консоль информацию о файле
    console.log("File info:", req.file);
    
    // Выводим в консоль информацию о пользователе
    console.log("User info:", req.user);

    // Обработка аватарки с использованием jimp
    const image = await jimp.read(req.file.path);
    await image.resize(250, 250).write(req.file.path);

    // Генерация уникального имени файла
    console.log("User ID:", req.user._id);
    console.log("File path:", req.file.path);
    const uniqueFileName = `${Date.now()}-${req.user._id}${path.extname(
      req.file.originalname
    )}`;

    // Выводим в консоль уникальное имя файла
    console.log("Unique file name:", uniqueFileName);

    // Перемещение аватарки из tmp в public/avatars
    await fs.rename(req.file.path, `public/avatars/${uniqueFileName}`);

    // Обновление поля avatarURL у пользователя
    req.user.avatarURL = `/avatars/${uniqueFileName}`;
    await req.user.save();

    // Ответ с новым URL аватарки
    res.json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateAvatar;
