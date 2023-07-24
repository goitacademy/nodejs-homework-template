const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../../models/users.js");
require("dotenv").config();
const secret = process.env.secret;

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.startus(400).json({
      status: "error",
      code: 400,
      message: "imcorrect login or password",
      data: "Bad reqaues",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, secret, { expriresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
});

router.post("registration", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.finOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is alrady in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,

      data: {
        message: "Registeration Successful",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/list", auth, (req, res, next) => {
  const { username } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Autorization was successful: ${username}`,
    },
  });
});

module.expots = router;
