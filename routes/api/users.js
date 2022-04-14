const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./../../service/schemas/user");
const { auth } = require("./middleware/auth.js");
const { getUserById, updateUserToken } = require("./utils");
require("dotenv").config();
const gravatar = require("gravatar");
const secret = process.env.SECRET;
const multer = require("multer");
const { storage } = require("./middleware/multer.js");
const upload = multer({ storage });
const Jimp = require("jimp");
const fs = require("fs");

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

  if (user) {
    return res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } else {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
    });
  }
});

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);

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
    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();

    if (password) {
      res
        .json({
          status: "success",
          code: 201,
          data: {
            message: "Registration successful",
          },
        })
        .status(201);
    } else {
      res.json({
        status: "error",
        code: 400,
        data: {
          message: "Registration failed",
        },
      });
    }
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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    const { _id } = req.user;
    console.log(req.file);
    const avatarURL = `./avatars/av_${_id}.png`;
    Jimp.read(`tmp/${req.file.filename}`)
      .then((avatar) => {
        return avatar.resize(250, 250).write(`public/avatars/av_${_id}.png`);
      })
      .catch((err) => {
        console.error(err);
      });
    try {
      const result = await User.findByIdAndUpdate(_id, { avatarURL });
      if (result) {
        fs.unlink(req.file.path, (err) => {
          console.error(err);
        });
        console.log(req.file);
        res.status(200).json({
          status: "success",
          code: 200,
          message: "OK",
          data: {
            avatarURL,
          },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `user not found`,
          data: "Not Found",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
);

module.exports = router;
