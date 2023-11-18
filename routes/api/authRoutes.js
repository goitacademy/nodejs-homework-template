const logout = require('../../users/logout');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/authMiddleware');
const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/signup', async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      subscription: 'starter',
    });

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

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

module.exports = router;
