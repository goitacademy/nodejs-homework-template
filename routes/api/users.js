const express = require("express");
const Contact = require("../../service/schemas/contact");
const User = require("../../service/schemas/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

require("dotenv").config();
const SECRET = process.env.SECRET;

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
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res.json({
      status: "success",
      code: 201,
      data: {
        message: "Signup complete",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/contacts", auth, async (req, res, next) => {
  const contacts = await Contact.find();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
});

module.exports = router;
