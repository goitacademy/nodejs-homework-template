const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const jimp = require('jimp');
const { User } = require('../models/utils');
const fs = require('fs');

const { register, login, authenticateToken, logout, getCurrentUser } = require('../models/users');

// Реєстрація
router.post('/register', register);

// Логін
router.post('/login', login);

// Вихід (логаут)
router.post('/logout', authenticateToken, logout);

// Поточний користувач
router.get('/current', authenticateToken, getCurrentUser);

// Налаштування Multer для зберігання завантаженого файлу
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Ендпоінт для завантаження аватарки користувача
router.patch('/avatars', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    // Отримання шляху до завантаженого файлу
    const filePath = req.file.path;

    // Завантаження аватарки та зміна її розмірів
    const image = await jimp.read(filePath);
    await image.cover(250, 250);
    await image.writeAsync(filePath);

    // Генерація унікального імені файлу
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(req.file.originalname);

    // Переміщення аватарки до папки public/avatars з унікальним іменем
    const newFilePath = path.join('public', 'avatars', uniqueFilename);
    await fs.promises.rename(filePath, newFilePath);

    // Оновлення поля avatarURL у моделі користувача
    const user = await User.findByIdAndUpdate(req.user.id, { avatarURL: `/avatars/${uniqueFilename}` }, { new: true });

    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;