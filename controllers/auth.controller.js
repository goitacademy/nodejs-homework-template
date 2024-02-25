const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const jimp = require("jimp");

require("dotenv").config();

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(409)
      .header("Content-Type", "application/json")
      .json({
        status: "conflict",
        code: 409,
        ResponseBody: {
          message: "Email in use",
        },
      });
  }
  try {
    const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    res
      .status(201)
      .header("Content-Type", "application/json")
      .json({
        status: "created",
        code: 201,
        ResponseBody: {
          user: {
            email: email,
            subscription: "starter",
            avatarURL: avatarURL,
          },
        },
      });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: "unauthorized",
      code: 401,
      ResponseBody: {
        message: "Email or password is wrong",
      },
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
  user.token = token;
  await user.save();
  res
    .status(200)
    .header("Content-Type", "application/json")
    .json({
      status: "created",
      code: 201,
      ResponseBody: {
        token,
        user: {
          email,
          subscription: "starter",
        },
      },
    });
};

const logout = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(401)
        .header("Content-Type", "application/json")
        .json({
          status: "Unauthorized",
          code: 401,
          ResponseBody: {
            message: "Not authorized",
          },
        });
    }

    user.token = null;
    await user.save();

    res.status(204).json({
      status: "no content",
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  const { _id, email } = req.user;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(401)
        .header("Content-Type", "application/json")
        .json({
          status: "Unauthorized",
          code: 401,
          ResponseBody: {
            message: "Not authorized",
          },
        });
    }
    res
      .status(200)
      .header("Content-Type", "application/json")
      .json({
        status: "OK",
        code: 200,
        ResponseBody: {
          email: email,
          subscription: "starter",
        },
      });
  } catch (error) {
    next(error);
  }
};

// ==========================================================================================================

const updateAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        ResponseBody: {
          message: "Not authorized",
        },
      });
    }

    const storage = multer.diskStorage({
      destination: "./tmp/",
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "avatar-" + uniqueSuffix + path.extname(file.originalname));
      },
    });

    const upload = multer({ storage: storage }).single("avatar");

    upload(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const tmpPath = req.file.path;
      const image = await jimp.read(tmpPath);
      await image.resize(250, 250).write(tmpPath);

      const avatarFileName = `avatar-${req.user._id}${path.extname(
        req.file.originalname
      )}`;
      const avatarDestination = path.join(
        __dirname,
        "../public/avatars",
        avatarFileName
      );
      fs.renameSync(tmpPath, avatarDestination);

      const avatarURL = `/avatars/${avatarFileName}`;
      user.avatarURL = avatarURL;
      await user.save();

      res.status(200).json({
        avatarURL,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateAvatar,
};
