const express = require('express');
const router = express.Router();
const { signup, login, logout, getCurrentUser, resendVerificationEmail, verifyEmail } = require('../controllers/session');
const { authMiddleware } = require('../middlewares/authMiddleware');
const multer = require('multer');
const Jimp = require('jimp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, getCurrentUser);

router.patch('/avatars', authMiddleware, upload.single('avatar'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const user = req.user;
  const tmpPath = path.join(__dirname, '../tmp', req.file.filename);
  const outputPath = path.join(__dirname, '../public/avatars', req.file.filename);

  try {
    const image = await Jimp.read(tmpPath);
    await image.resize(250, 250).quality(80).writeAsync(outputPath);

    user.avatarURL = `/avatars/${req.file.filename}`;
    await user.save();

    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    res.status(500).json({ message: 'Error processing file' });
  }
});

router.get('/verify/:verificationToken', verifyEmail);
router.post('/verify', resendVerificationEmail);

module.exports = router;
