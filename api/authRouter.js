const express = require("express");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authMiddleware = require("../middleware/jwt");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const uploadMiddleware = require("../middleware/uploadMiddleware.js");
const storeAvatarDir = path.join(__dirname, "../public/avatars");
const isImageAndTransform = require("../helpers/helpers.js");
const { sendVerificationEmail } = require("../controllers/email");

const router = express.Router();

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/signup", async (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    const verificationToken = uuidV4().replace(/-/g, "").substring(0, 20);
    const newUser = new User({ email, password, verificationToken });
    const gravatarURL = gravatar.url(email);
    await newUser.setPassword(password);
    newUser.avatarURL = gravatarURL;
    await newUser.save();
    await sendVerificationEmail(email, verificationToken, req);
    return res.status(201).json({
      message: `${email} - User Created. Verification email sent.`,
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
          avatarURL: newUser.avatarURL,
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
      avatarURL: currentUser.avatarURL,
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "File isn't a photo" });
    }
    const { path: temporaryPath } = req.file;
    const extension = path.extname(temporaryPath);
    const fileName = `${uuidV4()}${extension}`;
    const filePath = path.join(storeAvatarDir, fileName);

    const isValidAndTransform = await isImageAndTransform(temporaryPath);
    if (!isValidAndTransform) {
      await fs.unlink(temporaryPath);
      return res
        .status(400)
        .json({ message: " File isn't a photo but is pretending" });
    }

    try {
      await fs.rename(temporaryPath, filePath);
    } catch (error) {
      await fs.unlink(temporaryPath);
      return next(error);
    }
    try {
      const currentUser = res.locals.user;
      currentUser.avatarURL = `/avatars/${fileName}`;
      return res.status(200).json({ avatarURL: currentUser.avatarURL });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/verify/:verificationToken", async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (verificationToken) {
      user.verificationToken = null;
      user.verify = true;
      await user.save();

      return res.status(200).json({ message: "Successful response" });
    } else {
      return res.status(400).json({ message: "Invalid verification token" });
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/verify", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing required field email" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await sendVerificationEmail(email, user.verificationToken, req);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error resending verification email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
