const express = require("express");
const User = require("../../models/users.model");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

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

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (user) {
    res.json({
      status: "error",
      code: 409,
      data: `Conflict`,
      message: "User already exists!",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    res.json({
      status: "succress",
      code: 201,
      data: {
        message: "Register complete!",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, _) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Incorrect login/password",
      message: "User already exists!",
    });
  }

  const secret = "testsecret";
  const token = jwt.sign({ userId: user._id }, secret);

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

router.get("/logout", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/current", auth, async (req, res, _) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.json({
      status: "error",
      code: 401,
      data: {
        message: "Not authorized",
      },
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      users: user || [],
    },
  });
});

module.exports = router;
