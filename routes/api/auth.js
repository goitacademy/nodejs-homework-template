const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const auth = require('../../middlewares/auth');
const sendVerificationEmail = require('../../services/emailService');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const tmpDir = path.join(__dirname, '../../tmp');
const avatarsDir = path.join(__dirname, '../../public/avatars');

const upload = multer({ dest: tmpDir });

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = uuidv4();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      verificationToken,
      verify: false,
    });

    console.log('Nowy użytkownik utworzony:', newUser);
    console.log('Verification token:', verificationToken);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        verificationToken: verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    if (!user.verify) {
      return res.status(401).json({ message: 'Email not verified' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/logout', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/current', auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const { path: tempPath, originalname } = req.file;
      const ext = originalname.split('.').pop();
      const newAvatarName = `${req.user._id}.${ext}`;
      const newAvatarPath = path.join(avatarsDir, newAvatarName);

      const image = await jimp.read(tempPath);
      await image.resize(250, 250).writeAsync(newAvatarPath);

      await fs.unlink(tempPath);

      const avatarURL = `/avatars/${newAvatarName}`;
      await User.findByIdAndUpdate(req.user._id, { avatarURL });

      res.status(200).json({ avatarURL });
    } catch (error) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      next(error);
    }
  }
);

router.get('/verify/:verificationToken', async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    next(error);
  }
});

router.post('/verify', async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'missing required field email' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: 'Verification has already been passed' });
    }

    await sendVerificationEmail(email, user.verificationToken);

    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
