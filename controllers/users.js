const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const { signupSchema, loginSchema, emailSchema } = require("../authorization/userAuthorization");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="http://localhost:3000/api/users/verify/${verificationToken}">here</a> to verify your email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const signup = async (req, res, next) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    const verificationToken = uuidv4();

    const newUser = await User.create({ email, password: hashedPassword, avatarURL, verificationToken });
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription, avatarURL, verificationToken } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!user.verify) {
      return res.status(401).json({ message: "Email not verified" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.token = token;
    await user.save();

    res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    res.status(200).json({ email: req.user.email, subscription: req.user.subscription });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.verificationToken });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    next(error);
  }
};

const resendVerificationEmail = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) return res.status(400).json({ message: "missing required field email" });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.verify) return res.status(400).json({ message: "Verification has already been passed" });

    await sendVerificationEmail(user.email, user.verificationToken);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { path: tempPath, originalname } = req.file;
    const ext = path.extname(originalname);
    const filename = `${req.user._id}${ext}`;
    const targetPath = path.join(__dirname, "../../public/avatars", filename);

    const image = await jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(targetPath);
    await fs.unlink(tempPath);

    req.user.avatarURL = `/avatars/${filename}`;
    await req.user.save();

    res.status(200).json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  verifyEmail,
  resendVerificationEmail,
  updateAvatar,
};