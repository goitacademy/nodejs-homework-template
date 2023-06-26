const express = require("express");
const { validateUser } = require("../../utils/validator");
const User = require("../../models/user");
const {
  createHashPassword,
  compareResult,
} = require("../../utils/passwordHash");
const { KEY } = process.env;
const jwt = require("jsonwebtoken");
const validateToken = require("../../utils/tokenValidator");
const httpErr = require("../../utils/HTTPErr");

const router = express.Router();

router.post("/register", validateUser(), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw httpErr(409, "Email in use");
    }

    const hashPassword = await createHashPassword(password);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

const signToken = (id) => jwt.sign({ id }, KEY, { expiresIn: "31d" });

router.post("/login", validateUser(), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw httpErr(401, "Email or password is wrong");
    }

    const comparePassword = await compareResult(password, user.password);

    if (!comparePassword) {
      throw httpErr(401, "Email or password is wrong");
    }

    const token = signToken(user._id);

    await User.findByIdAndUpdate(user._id, { token });

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

router.get("/current", validateToken, async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
});

router.post("/logout", validateToken, async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
});

module.exports = router;
