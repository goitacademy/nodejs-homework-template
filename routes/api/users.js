const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/verify/:verificationToken', async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);
    const verificationToken = uuidv4();

    const user = new User({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    await user.save();

    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: 'Verify your email',
      text: `Please verify your email by clicking on the following link: ${process.env.BASE_URL}/users/verify/${verificationToken}`,
      html: `<p>Please verify your email by clicking on the following link: <a href="${process.env.BASE_URL}/users/verify/${verificationToken}">Verify Email</a></p>`,
    };

    await sgMail.send(msg);

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ponowne wysyłanie maila

router.post('/verify', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'missing required field email' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verify) {
      return res.status(400).json({ message: 'Verification has already been passed' });
    }

    if (!user.verify) {
      return res.status(401).json({ message: 'Verification failed' });
    }

    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: 'Verify your email',
      text: `Please verify your email by clicking on the following link: ${process.env.BASE_URL}/users/verify/${user.verificationToken}`,
      html: `<p>Please verify your email by clicking on the following link: <a href="${process.env.BASE_URL}/users/verify/${user.verificationToken}">Verify Email</a></p>`,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// logowanie
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    if (!user.verify) {
      return res.status(401).json({ message: 'Please verify your email first' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;