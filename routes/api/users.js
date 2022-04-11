const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./../../service/schemas/user");
const { auth } = require("./middleware/auth.js");
const { getUserById, updateUserToken } = require("./utils");

require("dotenv").config();

const secret = process.env.SECRET;

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res
      .json({
        status: "error",
        code: 400,
        message: "Incorrect login or password",
        data: "Bad request",
      })
      .status(400);
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  await updateUserToken(user.id, token);

  res.json({
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
    return res
      .json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      })
      .status(409);
  }
  try {
    const newUser = new User({ email });

    newUser.setPassword(password);
    await newUser.save();
    res
      .json({
        status: "success",
        code: 201,
        data: {
          message: "Registration successful",
        },
      })
      .status(201);
  } catch (error) {
    next(error);
  }
});

router.get("/logout", auth, async (req, res, next) => {
  const { _id: userId } = req.user;

  await updateUserToken(userId, "");
  res.json({
    status: "success",
    code: 204,
    data: {
      message: `No Content`,
    },
  });
});

router.get("/current", auth, async (req, res, next) => {
  const { _id: userId } = req.user;

  const { email, subscription } = await getUserById(userId);

  res.json({
    status: "success",
    code: 204,
    data: {
      message: {
        email,
        subscription,
      },
    },
  });
});

module.exports = router;
