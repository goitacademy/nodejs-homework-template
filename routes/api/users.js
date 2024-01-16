const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const { nanoid } = require('nanoid');
const User = require('../../models/user');
const {
  validateSignup,
  validateLogin,
  validateVerification,
  validateResendVerification,
} = require('../../middleware/validation');

const { NODEMAILER_USER, NODEMAILER_PASS, BASE_URL, NODE_ENV } = process.env;

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  });
};

const sendVerificationEmail = async (user) => {
  const transporter = createTransporter();
  const verificationToken = nanoid();

  await User.findByIdAndUpdate(user._id, { verificationToken });

  const mailOptions = {
    from: NODEMAILER_USER,
    to: user.email,
    subject: 'Email verification',
    text: `Please follow the link to verify your email: ${BASE_URL}/users/verify/${verificationToken}`,
  };

  await transporter.sendMail(mailOptions);
};

router.post('/signup', validateSignup, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Conflict('Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      verificationToken: nanoid(),
    });

    await sendVerificationEmail(user);

    res.status(201).json({
      message: 'Registration successful. Verification email sent.',
    });
  } catch (error) {
    next(error);
  }
});

// Функція для завантаження файлів
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/avatars'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${nanoid()}${ext}`);
  },
});

const upload = multer({ storage });

// Оновлення аватара
router.patch('/avatars', upload.single('avatar'), async (req, res, next) => {
  try {
    const userId = req.user._id;
    const avatarURL = req.file.filename;

    // Оновити поле avatarURL користувача
    const updatedUser = await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.post('/signup', validateSignup, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Conflict('Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      verificationToken: nanoid(),
    });

    await sendVerificationEmail(user);

    res.status(201).json({
      message: 'Registration successful. Verification email sent.',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.verify || !(await bcrypt.compare(password, user.password))) {
      throw new Unauthorized('Email or password is wrong');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/verify/:verificationToken', validateVerification, async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOneAndUpdate(
      { verificationToken },
      { verify: true, verificationToken: null }
    );

    if (!user) {
      throw new NotFound('User not found');
    }

    res.status(200).json({
      message: 'Verification successful',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/verify', validateResendVerification, async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFound('User not found');
    }

    if (user.verify) {
      throw new BadRequest('Verification has already been passed');
    }

    await sendVerificationEmail(user);

    res.status(200).json({
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
