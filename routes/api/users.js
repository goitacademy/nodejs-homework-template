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
const { sendMail } = require("./middleware/sendgrid");
const { nanoid } = require("nanoid");
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
  const verificationToken = nanoid();
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
    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();
    sendMail(email, verificationToken);
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

const storage = multer.diskStorage({
  destination: "tmp/",
  filename: (req, file, cb) => cb(null, file.originalname),
  limits: { fileSize: 1048576 },
});
const upload = multer({ storage });

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    const { _id } = req.user;
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

router.get("/users/verify/:verificationToken", auth, async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const result = await updateVerificationToken(verificationToken);
    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Verification succesful",
        data: "OK",
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `User not found`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/users/verify", auth, async (req, res, next) => {
  const { email } = req.body;
  if (!error) {
    try {
      const user = await getUser(email);
      if (!user) {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `User not found`,
          data: "Not Found",
        });
      } else if (!user.isVerified) {
        sendMail(email, user.verificationToken);
        res.status(200).json({
          status: "success",
          code: 200,
          message: "Verification email sent",
          data: "OK",
        });
      } else {
        res.status(400).json({
          status: "error",
          code: 400,
          message: "Verification has already been passed",
          data: "Bad request",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  } else {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }
});

module.exports = router;
