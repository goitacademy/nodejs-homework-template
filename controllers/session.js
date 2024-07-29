const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/users');
const gravatar = require('gravatar');
const mailgun = require('mailgun-js');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

// Konfiguracja Mailgun
const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;
const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

// Walidacja użytkownika
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Funkcja do wysyłania e-maila weryfikacyjnego
const sendVerificationEmail = async (userEmail, verificationToken) => {
  const verificationUrl = `http://yourdomain.com/api/users/verify/${verificationToken}`;

  const data = {
    from: `noreply@${MAILGUN_DOMAIN}`,
    to: userEmail,
    subject: 'Email Verification',
    text: `Please verify your email by clicking the following link: ${verificationUrl}`,
  };

  try {
    await mg.messages().send(data);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

// Rejestracja użytkownika
const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = uuidv4();
    const newUser = new User({ email, password: hashedPassword, verificationToken });
    await newUser.save();

    // Wysyłanie e-maila weryfikacyjnego
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Logowanie użytkownika
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }
    if (!user.verify) {
      return res.status(401).json({ message: 'Email not verified' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    user.token = token;
    await user.save();
    res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    next(error);
  }
};

// Wylogowywanie użytkownika
const logout = async (req, res, next) => {
  try {
    const user = req.user;
    user.token = null;
    await user.save();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Pobieranie bieżącego użytkownika
const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

// Weryfikacja e-maila
const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
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
};

// Ponowne wysyłanie e-maila weryfikacyjnego
const resendVerificationEmail = async (req, res, next) => {
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
      return res.status(400).json({ message: 'Verification has already been passed' });
    }

    const verificationToken = uuidv4();
    user.verificationToken = verificationToken;
    await user.save();

    // Wysyłanie e-maila weryfikacyjnego
    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, getCurrentUser, resendVerificationEmail, verifyEmail };
