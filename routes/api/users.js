const express = require("express");
const User = require("../../service/schemas/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../service/auth");

require("dotenv").config();
const SECRET = process.env.SECRET;

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login/password",
    });
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET, {
    expiresIn: "1h",
  });

  user.token = token;

  await user.save();

  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
});

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      status: "error",
      code: 409,
      message: "User already exists",
    });
  }
  if (!email) {
    return res.json({
      status: "error",
      code: 400,
      message: "Please provide email",
    });
  }
  if (!password) {
    return res.json({
      status: "error",
      code: 400,
      message: "Please provide password",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res.json({
      status: "success",
      code: 201,
      data: {
        message: "Signup complete",
        user: `${newUser.email}, ${newUser.subscription}`,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  user.token = null;
  await user.save();

  res.status(204).json({
    data: "No content",
  });
});

router.get("/current", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
});

module.exports = router;
