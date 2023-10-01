const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../../models/userModel");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.details });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({
        user: { email: newUser.email, subscription: newUser.subscription },
      });
  } catch (error) {
    console.error("Error in /users/signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.details });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    user.token = token;
    await user.save();

    res
      .status(200)
      .json({
        token,
        user: { email: user.email, subscription: user.subscription },
      });
  } catch (error) {
    console.error("Error in /users/login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
  });

router.get('/logout', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user) {
            return res.statur(401).json({ message: 'Not authorized' });
        }
        user.token = null;
        await user.save();
        res.status(204).send();
    } catch (error) {
        console.error("Error in /users/logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/current', authMiddleware, async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
      }
  
      const { email, subscription } = user;
      res.status(200).json({ email, subscription });
    } catch (error) {
      console.error("Error in /users/current:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.patch('/users', authMiddleware, async (req, res) => {
    try {
      const { subscription } = req.body;
  
      const allowedSubscriptions = ['starter', 'pro', 'business'];
  
      if (!allowedSubscriptions.includes(subscription)) {
        return res
          .status(400)
          .json({ message: 'Invalid subscription value' });
      }
  
      req.user.subscription = subscription;
      await req.user.save();
  
      res.status(200).json({ message: 'Subscription updated successfully' });
    } catch (error) {
      console.error('Error in /users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });  

module.exports = router;
