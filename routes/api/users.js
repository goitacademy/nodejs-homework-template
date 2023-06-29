const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");
const jimp = require("jimp");

const router = express.Router();
const { auth } = require("../../auth/auth.js");
const {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
} = require("../../controllers/users.js");

const { issueToken } = require("../../auth/issueToken.js");

const { userValidationSchema } = require("../../models/user.js");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }

  const newUser = await getUserByEmail(email);

  if (newUser) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const user = await createUser(email, password);
    return res.status(201).json({
      status: "Created",
      code: 201,
      message: "Registration successful",
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }

  const user = await getUserByEmail(email);
  const userPassword = user.password;

  const passwordCorrect = bcrypt.compareSync(password, userPassword);

  if (!user || !passwordCorrect) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Email or password is wrong",
      data: "Bad request",
    });
  }

  try {
    const token = issueToken(user);

    const newData = { token: token };
    await updateUser(user._id, newData);

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

router.get("/logout", auth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newData = { token: null };
    await updateUser(_id, newData);
    return res.status(204).json({
      message: "Logged out",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/current", auth, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatar: user.avatarURL,
        },
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

const uploadTmpDir = path.join(process.cwd(), "tmp");
const avatarsDir = path.join(process.cwd(), "/public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadTmpDir);
  },
  avatarFilePath: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    const { path: temporaryName, originalname: originalName } = req.file;

    const image = await jimp.read(temporaryName);
    await image.resize(250, 250);
    await image.writeAsync(temporaryName);

    const { _id } = req.user;

    const userId = req.user.id;
    const newName = userId + "-" + originalName;
    const avatarFilePath = path.join(avatarsDir, newName);

    try {
      await fs.rename(temporaryName, avatarFilePath);

      const newData = { avatarURL: avatarFilePath };
      await updateUser(_id, newData);

      const user = await getUserById(req.user.id);
      return res.status(200).json({
        status: "ok",
        code: 200,
        message: "File uploaded successfully",
        data: {
          avatarURL: user.avatarURL,
        },
      });
    } catch (error) {
      console.log(error.message);
      await fs.unlink(temporaryName);
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
        error: error.message,
      });
    }
  }
);

module.exports = router;