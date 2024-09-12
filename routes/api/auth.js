const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const User = require('../../models/user');
const auth = require('../../middlewares/auth');
const gravatar = require('gravatar');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

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

    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email or password is wrong' });
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
      next(error);
    }
  }
);

module.exports = router;
