const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../../models/auth/user");
const { registerSchema, loginSchema } = require("../../models/auth/userSchema");
const authenticate = require("../../middlewares/authMiddlewar");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: `${error}` });
    } else {
      const newUser = await registerUser(req);
      res.status(201).json({
        user: {
          email: newUser.email,
          subscription: newUser.subscription || "starter",
        },
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email in use" });
    } else {
      next(error);
    }
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: `${error}` });
    } else {
      const user = await loginUser(req);
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/current", authenticate, (req, res, next) => {
  try {
    const { subscription, email } = req.user;
    res.json({ subscription, email });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", authenticate, async (req, res, next) => {
  try {
    await logoutUser(req);
    res.status(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
