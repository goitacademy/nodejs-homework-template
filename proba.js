// controllers/updateAvatar.js
const jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const updateAvatar = async (req, res) => {
  console.log("Update avatar function is called");
  try {
    // Перевірка, що req.file існує та має властивість path
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded updateAvatar" });
    }

    // Виведення інформації про файл у консоль
    console.log("File info:", req.file);

    // Виведення інформації про користувача у консоль
    console.log("User info:", req.user);

    // Обробка аватарки за допомогою jimp
    const image = await jimp.read(req.file.path);
    await image.resize(250, 250).write(req.file.path);

    // Генерація унікального імені файлу
    console.log("User ID:", req.user._id);
    console.log("File path:", req.file.path);
    const uniqueFileName = `${Date.now()}-${req.user._id}${path.extname(
      req.file.originalname
    )}`;

    // Виведення унікального імені файлу у консоль
    console.log("Unique file name:", uniqueFileName);

    // Переміщення аватарки з tmp в public/avatars
    await fs.rename(req.file.path, path.join(__dirname, '..', 'public', 'avatars', uniqueFileName));

    // Оновлення поля avatarURL у користувача
    req.user.avatarURL = `/avatars/${uniqueFileName}`;
    await req.user.save();

    // Відповідь із новим URL аватарки
    res.json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateAvatar;
