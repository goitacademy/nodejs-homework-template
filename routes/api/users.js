const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../../models/users');
const authMiddleware = require('../../middlewares/authMiddleware');

const multer = require('multer');
const jimp = require('jimp');
const { promisify } = require('util');
const path = require('path');

const gravatar = require('gravatar');

const router = express.Router();

const tmpFolder = path.join(__dirname, '../../tmp');
const upload = multer({ dest: tmpFolder });
const AVATAR_SIZE = 250;

const generateFileName = (userId, originalName) => {
    const fileExtension = originalName.split('.').pop();
    return `${userId}-${Date.now()}.${fileExtension}`;
  };

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post('/register', async (req, res) => {
    const { body } = req;
  
    // Validate request body using Joi schema
    const { error } = userValidationSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    // Check if the user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use' });
    }
  
    // Generate avatar URL using gravatar
    const avatarURL = gravatar.url(body.email, { s: '250', d: 'retro' });
  
    try {
      // Create a new user
      const newUser = await User.create({ ...body, avatarURL });
  
      res.status(201).json({
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/login', async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    user.token = null;
    await user.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/current', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch(
    '/avatars',
    authMiddleware,
    upload.single('avatar'),
    async (req, res) => {
      try {
        // Перевірка чи користувач має права на оновлення аватара
        if (req.user._id.toString() !== req.body.userId) {
          return res.status(401).json({ message: 'Not authorized' });
        }
  
        // Завантажений файл
        const { file } = req;
  
        // Зчитування файлу та його обробка
        const image = await jimp.read(file.path);
        await image.resize(AVATAR_SIZE, AVATAR_SIZE).writeAsync(file.path);
  
        // Унікальне ім'я файлу
        const fileName = generateFileName(req.user._id, file.originalname);
  
        // Переміщення файлу в папку public/avatars
        await promisify(require('fs').rename)(
          file.path,
          path.join(__dirname, '../../public/avatars', fileName)
        );
  
        // Поставити згенероване посилання на аватар у поле користувача
        const avatarURL = `/avatars/${fileName}`;
  
        // Оновити поле avatarURL користувача в базі даних
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
  
        res.status(200).json({ avatarURL });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );

module.exports = router;