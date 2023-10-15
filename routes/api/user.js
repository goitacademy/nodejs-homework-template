const express = require('express');
const router = express.Router();
const User = require('../../models/user'); // Змінена шляху до моделі користувача
const authMiddleware = require('../../middleware/auth'); // Змінена шляху до middleware/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const multer = require('multer');
const jimp = require('jimp');
const path = require('path');


// Реєстрація
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }
    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }); // Генерувати URL аватарки
    const user = new User({ email, password, avatarURL });
    await user.save();
    return res.status(201).json({ user: { email: user.email, subscription: user.subscription, avatarURL } });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(400).json({ message: 'Validation error' });
  }
});

// Логін
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }
    // Створення та повернення JWT токена
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); // Використовуйте JWT_SECRET з .env
    return res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(400).json({ message: 'Validation error' });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    return res.status(204).send();
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


 // Налаштування Multer для завантаження файлів
const storage = multer.memoryStorage(); // Збереження в пам'яті
const upload = multer({ storage });

// Маршрут для оновлення аватарки
router.patch('/avatars', authMiddleware, upload.single('avatar'), async (req, res) => {
  const user = req.user;
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const image = await jimp.read(req.file.buffer);
    await image.cover(250, 250).writeAsync(path.join(__dirname, '../../public/avatars', `${user._id}.jpg`));

    const avatarURL = `/avatars/${user._id}.jpg`;
    user.avatarURL = avatarURL;
    await user.save();

    return res.status(200).json({ avatarURL });
  } catch (error) {
    console.error('Avatar upload error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
