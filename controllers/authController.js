const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../public/avatars");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../email/email");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// REJESTRACJA

const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
        data: "Conflict",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { s: "250", d: "identicon" }, true);

    const verificationToken = uuidv4();
    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    const verificationLink = `${process.env.BASE_URL}/users/verify/${verificationToken}`;

    await sendEmail(
      email,
      "Verify your email",
      `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
    );

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL,
        message: "User registered. Check your email for verification link.",
      },
    });
  } catch (error) {
    next(error);
  }
};
// LOGOWANIE

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: `User ${email} doesn't exist`,
        data: "Bad request",
      });
    }
    if (!user.verify) {
      return res.status(403).json({
        status: "error",
        code: 403,
        message: "Please verify your email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
        data: "Bad request",
      });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
      },
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

// WYLOGOWANIE

const logout = async (req, res, next) => {
  try {
    const user = req.user;
    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { path: tmpPath, filename } = req.file;

    const newPath = path.join(avatarsDir, filename);

    const image = await Jimp.read(tmpPath);

    await image.resize(250, 250).writeAsync(tmpPath);

    await fs.rename(tmpPath, newPath);

    const avatarURL = `/avatars/${filename}`;
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
};
