const express = require('express');
const {
  User,
  joiUserSchema,
  joiUpdSubscriptionSchema,
} = require('../../models');
const router = express.Router();
const { BadRequest, Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate, upload } = require('../../middlewares');
const fs = require('fs').promises;
const Jimp = require('jimp');
const gravatar = require('gravatar/lib/gravatar');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const { SECRET_KEY } = process.env;

router.post('/signup', async (req, res, next) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict('User already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscritpion: 'starter',
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Unauthorized('Email or password is wrong');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Unauthorized('Email or password is wrong');
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findOneAndUpdate({ email }, { token });

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/logout', authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get('/current', authenticate, async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/', authenticate, async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { email } = req.user;

    if (subscription === undefined) {
      throw new BadRequest('missing field subscription');
    }
    const { error } = joiUpdSubscriptionSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { subscription: subscription },
      {
        new: true,
      },
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const { path: tempUpload, filename } = req.file;
      const { email } = req.user;

      const extension = filename.split('.').at(-1);
      const newFileName = `${req.user._id}.${extension}`;
      const fileUpload = path.join(avatarsDir, newFileName);

      const tempAvatar = await Jimp.read(tempUpload);
      tempAvatar.resize(250, 250);
      tempAvatar.write(tempUpload);

      await fs.rename(tempUpload, fileUpload);
      const avatarURL = path.join('avatars', newFileName);

      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { avatarURL },
        {
          new: true,
        },
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      await fs.unlink(tempUploadh);
      next(error);
    }
  },
);

module.exports = router;
