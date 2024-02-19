const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticateToken = require('../../middleware/autMiddleware');
const User = require('../../models/users');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const generateAuthToken = (user) => {
  const payload = {
    userId: user._id,
      email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const validation = registerSchema.validate({ name, email, password });
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const validation = loginSchema.validate({ email, password });
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = generateAuthToken(user);

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

router.get('/current', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const token = req.headers.authorization.split(' ')[1];

    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { tokens: token } }
    );

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
});

module.exports = router;