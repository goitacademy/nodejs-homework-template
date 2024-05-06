const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const multer = require('multer');
const Jimp = require('jimp');
const fs = require('fs').promises; 
const { v4: uuidv4 } = require('uuid');
const { sendVerificationEmail } = require('../services/email.service'); 

require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

const upload = multer({
  dest: 'tmp/',
  limits: { fileSize: 2 * 1024 * 1024 } 
});

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


router.post("/signup", async (req, res) => {
  try {
    const { email, password } = await userValidationSchema.validateAsync(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }
    
    const avatarURL = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = uuidv4(); 
    
    const newUser = new User({
      email, 
      password: hashedPassword, 
      avatarURL, 
      verificationToken, 
      verify: false
    });

    await newUser.save();

    sendVerificationEmail(email, verificationToken, req.headers.origin);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL
      },
      message: "Verification email sent."
    });
  } catch (error) {
    res.status(400).json({ message: error.details[0].message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = await userValidationSchema.validateAsync(req.body);
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.token = token;
    await user.save();
    res.json({
      token,
      user: { email: user.email, subscription: user.subscription, avatarURL: user.avatarURL },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/logout", authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/current", authenticateToken, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
    avatarURL: req.user.avatarURL
  });
});

router.patch("/avatars", authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    const { path: tempPath, filename } = req.file;
    const image = await Jimp.read(tempPath);
    const newFileName = `public/avatars/${filename}.png`;

    await image.resize(250, 250).writeAsync(newFileName);
    await fs.unlink(tempPath);

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatarURL: `/avatars/${filename}.png` }, { new: true });
    res.json({ avatarURL: updatedUser.avatarURL });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
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


router.post("/users/verify/resend", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.verify) {
    return res.status(400).json({ message: "Verification has already been passed" });
  }

  user.verificationToken = uuidv4();
  await user.save();
  sendVerificationEmail(user.email, user.verificationToken, req.headers.origin);
  
  res.status(200).json({ message: "Verification email resent" });
});

module.exports = router;
