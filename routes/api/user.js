const fs = require('fs').promises;
const express = require("express");
// const jwt = require("jsonwebtoken");
const multer = require("multer");
const Jimp = require("jimp");
const path = require("path");

// const jwtSecret = process.env.JWT_SECRET;

const loginHandler = require("../../auth/loginHandler");
const { auth } = require("../../auth/passportStrategy.js")
const userControllers = require("../../controllers/users.js");

const storeAvatar = path.join(process.cwd(), "tmp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storeAvatar);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: 1048576,
});

const upload = multer({ storage });

require("dotenv").config();

const router = express.Router();

const { User, userValidationSchema } = require("../../models/user");

router.post("/signup", async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  const { email, password } = req.body;
  if (error) {
    return res.status(409).json(error.details[0].message);
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email id already in use",
      data: "Conflict",
    });
  }

  try {
    const user = await userControllers.createUser(email, password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  try {
    const token = await loginHandler(email, password);

    return res.status(200).send(token);
  } catch (err) {
    return res.status(401).send(err);
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    await userControllers.logout(req.user._id);
    res.status(204).send("Logout success");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/current", auth, async (req, res) => {
  return res.status(200).json(req.user);
});

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { path: temporaryName, originalname } = req.file;
      const fileName = path.join(storeAvatar, originalname);

      fs.rename(temporaryName, fileName);

      const img = await Jimp.read(fileName);
      await img.autocrop().cover(250, 250).quality(72).writeAsync(fileName);

      fs.rename(
        fileName,
        path.join(process.cwd(), "public/avatars", originalname)
      );

      const avatarURL = path.join(
        process.cwd(),
        "public/avatars",
        originalname
      );

      const cleanAvatarURL = avatarURL.replace(/\s/g, "/");
      const user = await userControllers.updateAvatar(_id, cleanAvatarURL);

      res.status(200).json(user);
    } catch (err) {
      next(err);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;