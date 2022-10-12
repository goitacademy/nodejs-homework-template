const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");

const { RequestError } = require("../../helpers");
const authenticate = require("../../middlewares/authenticate");

const usersPostSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().optional(),
});

const SECRET_KEY = "1sa3fdj63op99";

router.post("/register", async (req, res, next) => {
  try {
    const { error } = usersPostSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const { email, password } = req.body;

    const mailIsUsed = await User.findOne({ email });
    if (mailIsUsed) {
      throw RequestError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      password: hashedPassword,
      email,
    });

    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = usersPostSchema.validate(req.bpdy);
    if (error) {
      throw RequestError(400, error.message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw RequestError(401, "Email or password is wrong");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw RequestError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.findOneAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", authenticate, async (req, res, next) => {
  const id = req.user._id;
  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json();
});

router.get("/current", authenticate, async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
});

module.exports = router;
