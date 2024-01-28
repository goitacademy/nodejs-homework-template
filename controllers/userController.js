const jimp = require('jimp');
const path = require('path');
const fs = require('fs');
const User = require('../models/user'); // Путь к модели User

exports.updateAvatar = async (req, res) => {
  try {
    const { path: tempPath, filename } = req.file;
    const newFilename = `${req.user.id}_${Date.now()}.jpeg`;
    const uploadPath = path.join('public/avatars', newFilename);

    // Обработка изображения с jimp
    const image = await jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(uploadPath);

    // Удаление временного файла
    fs.unlinkSync(tempPath);

    // Обновление пути к аватару в базе данных пользователя
    await User.findByIdAndUpdate(req.user.id, { avatarURL: `/avatars/${newFilename}` });

    res.json({ avatarURL: `/avatars/${newFilename}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

