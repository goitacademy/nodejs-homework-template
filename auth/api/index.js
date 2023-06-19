const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const secret = "goit";

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 401,
      data: "Bad request",
      message: "Incorrect login/password",
    });
  }
  try {
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    return res.json({
      status: "success",
      code: 200,
      data: { token },
    });
  } catch (e) {
    return res.json.status(400).send(e.message);
  }
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();
    return res.json({
      status: "success",
      code: 201,
      data: {
        message: "Register completed",
      },
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get(
  "/logout",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Unauthorized",
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  },
  async (req, res, next) => {
    const { id } = req.user;
    const currentUser = await User.findOne({ _id: id });
    currentUser.token = null;
    try {
      await currentUser.save();
      return res.json({
        status: "success",
        code: 204,
      });
    } catch (e) {
      return res.status(401).send(e.message);
    }
  }
);

router.get(
  "/current",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Unauthorized",
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  },
  async (req, res, next) => {
    const { id } = req.user;
    const currentUser = await User.findOne({ _id: id });

    res.json({
      status: "success",
      code: "200",
      data: {
        email: currentUser.email,
        subscription: currentUser.subscription,
      },
    });
  }
);

module.exports = router;
