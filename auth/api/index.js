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

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return res.json({
    status: "success",
    code: 200,
    data: { token },
  });
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
    console.log(e.message);
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { id } = req.user;
    const currentUser = await User.findOne({ _id: id });
    res.json({
      status: "success",
      code: "200",
      data: {
        users: currentUser,
      },
    });
  }
);

module.exports = router;
