const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const gravatar = require("gravatar");
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const fs = require("fs/promises");

const { RequestError } = require("../../helpers");
const authenticate = require("../../middlewares/authenticate");

// Multer Configuration

const tmpDir = path.join(__dirname, "../..", "tmp");
const publicDir = path.join(__dirname, "../..", "public");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const newName = nanoid();
    const newFile = newName + "." + fileExt;
    cb(null, newFile);
  },
});

const upload = multer({
  storage: multerConfig,
});

const usersPostSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().optional(),
});

const usersPatchSchema = Joi.object({
  subscription: Joi.valid("starter", "pro", "business"),
});

const SECRET_KEY = "1sa3fdj63op99";

router.post("/register", async (req, res, next) => {
  try {
    const { error } = usersPostSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const { email, password } = req.body;

    const mailIsUsed = await User.findOne({ email });
    if (mailIsUsed) {
      throw RequestError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const result = await User.create({
      password: hashedPassword,
      email,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = usersPostSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw RequestError(401, "Email or password is wrong");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw RequestError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    console.log(token);
    await User.findOneAndUpdate(user._id, { token });

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

router.post("/logout", authenticate, async (req, res, next) => {
  const id = req.user._id;
  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json();
});

router.get("/current", authenticate, async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
});

router.patch("/", authenticate, async (req, res, next) => {
  try {
    const { error } = usersPatchSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Invalid value");
    }
    const userId = req.user._id;
    const result = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const oldPath = req.file.path;
      const newFileName = `${req.user._id}.${req.file.filename}`;
      const newPath = path.join(publicDir, "avatars", newFileName);

      await fs.rename(oldPath, newPath);

      const result = await User.findByIdAndUpdate(
        req.user._id,
        {
          avatarURL: path.join("avatars", newFileName),
        },
        { new: true }
      );

      res.status(200).json({
        avatarURL: result.avatarURL,
      });
    } catch (error) {
      next(RequestError(401, "Not authorized"));
    }
  }
);

module.exports = router;
