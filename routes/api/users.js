const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const User = require("../../schemas/users.js");

const router = express.Router();

const schemaEmailPassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(20)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/)
    .required(),
});

const validateEmailPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await schemaEmailPassword.validateAsync({
      email,
      password,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.details[0].message,
      message:
        "Require a valid email and password-min 8 characters, max 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character @#$%^&+=!",
    });
  }
};

router.post("/signup", validateEmailPassword, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    console.error("Error en la ruta /:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.post("/login", validateEmailPassword, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.checkPassword(password)) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "1h",
  });
  res.json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
});

module.exports = router;
