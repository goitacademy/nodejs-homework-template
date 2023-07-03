const express = require("express");
const User = require("../../service/schemas/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../service/auth");
const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");
const jimp = require("jimp");
const { nanoid } = require("nanoid");

const uploadDir = path.join(process.cwd(), "tmp");
const storeAvatar = path.join(process.cwd(), "public/avatars");

require("dotenv").config();
const SECRET = process.env.SECRET;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

router.use((req, res, next) => {
  createFolderIsNotExist(uploadDir);
  createFolderIsNotExist(storeAvatar);
  next();
});

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
  if (!email) {
    return res.json({
      status: "error",
      code: 400,
      message: "Please provide email",
    });
  }
  if (!password) {
    return res.json({
      status: "error",
      code: 400,
      message: "Please provide password",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    console.log(newUser.avatarURL);
    await newUser.save();
    res.json({
      status: "success",
      code: 201,
      data: {
        message: "Signup complete",
        user: `${newUser.email}, ${newUser.subscription}`,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    console.log(req.file);
    const { path: temporaryName, originalname } = req.file;
    const uniqueName = nanoid();
    const fileName = path.join(storeAvatar, uniqueName.concat(originalname));
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File not found" });
      }

      const avatar = await jimp.read(req.file.path);

      await avatar
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(req.file.path);

      const user = await User.findById(req.user._id);

      user.avatarURL = `/avatars/${fileName}`;
      await user.save();

      await fs.rename(temporaryName, fileName);
      res.json({ avatar: user.avatarURL, status: 200 });
    } catch (err) {
      await fs.unlink(temporaryName);
      return next(err);
    }
  }
);

router.get("/logout", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  user.token = null;
  await user.save();

  res.status(204).json({
    data: "No content",
  });
});

router.get("/current", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
});

module.exports = router;
