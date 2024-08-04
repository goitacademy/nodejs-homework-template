const express = require("express");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const User = require("../models/user");
const { sendVerificationEmail } = require("../services/mailgun");

const router = express.Router();

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
    const verificationToken = uuidv4();
    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (
      !user ||
      !user.verify ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/verify/:verificationToken", async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
});

router.post("/verify/resend", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await sendVerificationEmail(user.email, user.verificationToken);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
