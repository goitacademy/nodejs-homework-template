const logout = require('../../users/logout');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/authMiddleware');
const multer = require('multer');
const jimp = require('jimp');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/signup', async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Utwórz unikalny token weryfikacyjny
    const verificationToken = uuidv4();

    // Utwórz odnośnik do weryfikacji emaila
    const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;

    // Wysyłka e-maila z odnośnikiem do weryfikacji
    await sendVerificationEmail(email, verificationLink);

    // Zapisz użytkownika w bazie danych z tokenem weryfikacyjnym
    const newUser = await userModel.create({
      email,
      password,
      subscription: 'starter',
      avatarURL: gravatar.url(email, { s: '250', d: 'retro' }, true),
      verificationToken,
    });

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
      message:
        'User created successfully. Please check your email for verification.',
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Funkcja do wysyłania e-maila z odnośnikiem do weryfikacji
async function sendVerificationEmail(email, verificationLink) {
  const transporter = nodemailer.createTransport({
    // Skonfiguruj transportera, np. do serwera SMTP
    // Przykład dla Gmail:
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password',
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}

router.patch(
  '/avatars',
  verifyToken,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const userId = req.user._id;

      // Sprawdź, czy użytkownik istnieje
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      // Odczytaj plik z żądania
      const fileBuffer = req.file.buffer;

      // Obróbka obrazu przy użyciu jimp
      const image = await jimp.read(fileBuffer);
      await image.resize(250, 250);
      const processedBuffer = await image.getBufferAsync(jimp.MIME_JPEG);

      // Zapisz załadowany awatar w folderze tmp
      const tempAvatarPath = path.join(__dirname, '../../tmp', `${userId}.jpg`);
      await image.writeAsync(tempAvatarPath);

      // Przenieś awatar do folderu public/avatars
      const avatarPath = path.join(
        __dirname,
        '../../public/avatars',
        `${userId}.jpg`
      );
      await image.writeAsync(avatarPath);

      // Usuń plik tymczasowy
      fs.unlinkSync(tempAvatarPath);

      // Zaktualizuj avatarURL w bazie danych
      user.avatarURL = `/avatars/${userId}.jpg`;
      await user.save();

      res.status(200).json({ avatarURL: user.avatarURL });
    } catch (error) {
      console.error('Error updating avatar:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

router.post('/login', async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = jwt.sign(
      { userId: user._id },
      'd97154c49fa7d1e961e0cae0bd6af1708d3d1b82ea7046fc9167baf79fdecf19',
      {
        expiresIn: '1h',
      }
    );

    console.log('Generated token:', token);

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/logout', verifyToken, async (req, res) => {
  try {
    console.log('Inside /logout endpoint');

    const userId = req.user._id;

    console.log(`Received logout request for user with ID: ${userId}`);

    const user = await userModel.findById(userId);
    if (!user) {
      console.log(`User not found for ID: ${userId}`);
      return res.status(401).json({ message: 'Not authorized' });
    }

    console.log(`Logging out user with ID: ${userId}`);

    user.token = null;
    await user.save();

    console.log(`User with ID ${userId} logged out successfully`);

    res.status(204).send();
  } catch (error) {
    console.error('Error during logout:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/current', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Return user data
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error('Error fetching current user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch(
  '/avatars',
  verifyToken,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const userId = req.user._id;

      // Sprawdź, czy użytkownik istnieje
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      // Odczytaj plik z żądania
      const fileBuffer = req.file.buffer;

      // Obróbka obrazu przy użyciu jimp
      const image = await jimp.read(fileBuffer);
      await image.resize(250, 250);
      const processedBuffer = await image.getBufferAsync(jimp.MIME_JPEG);

      // Utwórz unikalną nazwę pliku
      const uniqueFileName = `${userId}-${Date.now()}.jpg`;

      // Zapisz załadowany awatar w folderze tmp
      const tempAvatarPath = path.join(__dirname, '../../tmp', uniqueFileName);
      await image.writeAsync(tempAvatarPath);

      // Przenieś awatar do folderu public/avatars
      const avatarPath = path.join(
        __dirname,
        '../../public/avatars',
        uniqueFileName
      );
      await image.writeAsync(avatarPath);

      // Usuń plik tymczasowy
      fs.unlinkSync(tempAvatarPath);

      // Zaktualizuj avatarURL w bazie danych
      user.avatarURL = `/avatars/${uniqueFileName}`;
      await user.save();

      res.status(200).json({ avatarURL: user.avatarURL });
    } catch (error) {
      console.error('Error updating avatar:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);
router.get('/verify/:verificationToken', async (req, res) => {
  try {
    const { verificationToken } = req.params;

    // Sprawdź, czy istnieje użytkownik z podanym tokenem w bazie danych
    const user = await userModel.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Aktualizuj pola verify i verificationToken
    user.verify = true;
    user.verificationToken = null;

    await user.save();

    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error('Error during email verification:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/verify', async (req, res) => {
  try {
    const { error } = resendVerificationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Missing required field email' });
    }

    const { email } = req.body;

    // Sprawdź, czy istnieje użytkownik o podanym adresie e-mail
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Sprawdź, czy użytkownik nie został już zweryfikowany
    if (user.verify) {
      return res
        .status(400)
        .json({ message: 'Verification has already been passed' });
    }

    // Wygeneruj nowy token weryfikacyjny
    const verificationToken = uuidv4();
    user.verificationToken = verificationToken;
    await user.save();

    // Utwórz odnośnik do weryfikacji emaila
    const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;

    // Wysyłka e-maila z odnośnikiem do weryfikacji
    await sendVerificationEmail(email, verificationLink);

    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Error during email resend:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Funkcja do wysyłania e-maila z odnośnikiem do weryfikacji
async function sendVerificationEmail(email, verificationLink) {
  const transporter = nodemailer.createTransport({
    // Skonfiguruj transportera, np. do serwera SMTP
    // Przykład dla Gmail:
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password',
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}
module.exports = router;
