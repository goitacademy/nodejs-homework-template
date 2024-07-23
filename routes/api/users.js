const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const User = require("../../models/userModel");
const Joi = require("joi");
const multer = require("multer");
const jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
const router = express.Router();
const auth = require("../../middlewares/auth");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);

// Schematy walidacji
const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Konfiguracja Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../tmp"));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Rejestracja
router.post("/signup", async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email, { s: "250", r: "pg", d: "monsterid" });
  const newUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verificationLink = `http://localhost:3000/api/users/verify/${verificationToken}`;
  const msg = {
    to: email,
    from: "blocktomasz@gmail.com",
    subject: "Verify your email",
    text: `Please verify your email by clicking on the following link: ${verificationLink}`,
    html: `<p>Please verify your email by clicking on the following link: <a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logowanie
router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
});

// Obecny użytkownik
router.get("/current", auth, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
    avatarURL: req.user.avatarURL,
  });
});

// Wylogowanie
router.get("/logout", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.status(200).json({ message: "Successfully logged out" });
});

// Aktualizacja awatara
router.patch("/avatars", auth, upload.single("avatar"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Missing file" });
  }

  try {
    const { path: tempPath, filename } = req.file;
    const avatar = await jimp.read(tempPath);
    await avatar.resize(250, 250).writeAsync(tempPath);

    const newAvatarPath = path.join(
      __dirname,
      "../../public/avatars",
      filename
    );
    await fs.rename(tempPath, newAvatarPath);

    const avatarURL = `/public/avatars/${filename}`;
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    res.status(500).json({ message: error.message });
  }
});

// Weryfikacja e-maila
router.get("/verify/:verificationToken", async (req, res) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ponowne wysłanie e-maila weryfikacyjnego
router.post("/verify", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const msg = {
    to: email,
    from: "blocktomasz@gmail.com",
    subject: "Email Verification",
    text: `Please verify your email by clicking the following link: http://localhost:3000/api/users/verify/${user.verificationToken}`,
    html: `<strong>Please verify your email by clicking the following link: <a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Verify Email</a></strong>`,
  };

  await sgMail.send(msg);

  res.status(200).json({ message: "Verification email sent" });
});

module.exports = router;
