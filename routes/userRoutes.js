const express = require("express");

require("dotenv").config();

const { User } = require("../../service/schemas/user.schema");

const verifyToken = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const router = express.Router();

const { signup, login } = require("../../service/usersService");

const { signupAndLoginSchema, emailSchema } = require("../../validation/Joi");
const sendEmailToVerify = require("../../nodemailer/emailVerification");

const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;

    const userToSignup = signupAndLoginSchema.validate({ email, password });
    if (userToSignup.error) {
      return res
        .status(400)
        .json({ message: userToSignup.error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email in use" });
    }

    const user = await signup({ email, password, subscription });
    res.status(201).json({
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userToLogin = signupAndLoginSchema.validate({ email, password });
    if (userToLogin.error) {
      return res
        .status(400)
        .json({ message: userToLogin.error.details[0].message });
    }
    const user = await login(email, password);

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();
    return res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", verifyToken, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    user.token = null;
    await user.save();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
router.get("/current", verifyToken, async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: currentUser.email,
      subscription: currentUser.subscription,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/avatars",
  verifyToken,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message:
            "Wrong file type to upload (jpg,png,jpeg,gif allowed) or no avatar uploaded",
        });
      }

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
      }

      const { path: temporaryPath } = req.file;
      const { _id } = req.user;
      const extension = path.extname(temporaryPath);

      const newFileName = `${_id}-${Date.now()}${extension}`;

      const avatarsDir = path.join(process.cwd(), "public", "avatars");
      const avatarPath = path.join(avatarsDir, newFileName);

      try {
        await fs.rename(temporaryPath, avatarPath);
        const avatar = await Jimp.read(avatarPath);
        await avatar
          .cover(250, 250)
          .crop(0, 0, 250, 250)
          .writeAsync(avatarPath);
      } catch (error) {
        await fs.unlink(temporaryPath);
        return next(error);
      }
      try {
        await User.findByIdAndUpdate(_id, {
          avatarURL: `avatars/${newFileName}`,
        });
        return res.status(200).json({ avatarURL: `avatars/${newFileName}` });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
);
router.get("/verify/:verificationToken", async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });
    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
});
router.post("/verify", async (req, res, next) => {
  try {
    const { email } = req.body;
    const correctEmail = emailSchema.validate({ email });
    if (correctEmail.error) {
      return res
        .status(400)
        .json({ message: correctEmail.error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "missing required field email" });
    }
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }
    await sendEmailToVerify({
      email,
      verificationToken: user.verificationToken,
    });

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
