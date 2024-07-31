const express = require("express");
const User = require("../../models/user.js");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authMiddleware = require("../../middleware/jwt.js");
const gravatar = require('gravatar');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const router = express.Router();

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp'); 
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}_${Date.now()}${path.extname(file.originalname)}`); 
  }
});

const upload = multer({ storage: storage });

router.post("/signup", async (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }, { _id: 1 }).lean();
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    const newUser = new User({ email, password });
    await newUser.setPassword(password);

    const avatar = gravatar.url(email, { s: '250', d: 'retro' });

    newUser.avatarURL = avatar; 

    await newUser.save();
    return res.status(201).json({
      user: {
        email: email,
        subscription: newUser.subscription,
        avatarURL: avatar 
      },
    });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "No such user" });
    }

    const isPasswordCorrect = await user.validatePassword(password);
    if (isPasswordCorrect) {
      const payload = {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
      };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
      user.token = token;
      await user.save();

      return res.status(200).json({
        token: token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", authMiddleware, async (req, res, next) => {
  try {
    const userId = res.locals.user._id;
    const user = await User.findById(userId);

    user.token = null;
    await user.save();

    return res.status(200).json({ message: "user logged out" });
  } catch (err) {
    next(err);
  }
});

router.get("/current", authMiddleware, async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    return res.status(200).json({
      email: currentUser.email,
      subscription: currentUser.subscription,
    });
  } catch (err) {
    next(err);
  }
});

router.patch("/avatars", authMiddleware, upload.single('avatar'), async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const Jimp = require('jimp');
    const { filename } = req.file;

    const image = await Jimp.read(`./tmp/${filename}`);
    await image.resize(250, 250).write(`./tmp/${filename}`);

    const avatarPath = path.join(__dirname, '..', 'public', 'avatars', filename);
    await fs.rename(`./tmp/${filename}`, avatarPath);

    const user = await User.findByIdAndUpdate(userId, { avatarURL: `/avatars/${filename}` }, { new: true });

    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
});

module.exports = router;