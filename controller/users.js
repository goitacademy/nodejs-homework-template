const service = require("../service/index");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const jimp = require("jimp");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const secret = process.env.SECRET;

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const subscriptionValidationSchema = Joi.object().keys({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const avatarDir = path.join(process.cwd(), "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const existingUser = await service.findUser({ email: email });
    if (existingUser) {
      res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
      return;
    }
    const avatar = gravatar.url(req.body.email, {
      s: "250",
      r: "pg",
      d: "wavatar",
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await service.createUser({
      email: email,
      password: hashedPassword,
      avatarURL: avatar,
    });
    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          email: createUser.email,
          subscription: createUser.subscription,
        },
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const user = await service.findUser({ email: email });
    if (!user) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "2h" });
    const loginUser = await service.updateToken({ email, token });
    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        token: loginUser.token,
        user: {
          email: loginUser.email,
          subscription: loginUser.subscription,
          avatarURL: loginUser.avatarURL,
        },
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const logout = async (req, res) => {
  const user = req.user;
  try {
    await service.updateToken({ email: user.email, token: null });
    res.status(204).json({
      status: "OK",
      code: 204,
      message: "Logged out",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const current = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const subscription = async (req, res) => {
  const user = req.user;
  const { subscription } = req.body;
  try {
    const { error } = subscriptionValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const updatedUser = await service.updateUserSubscription({
      email: user.email,
      subscription,
    });
    res.status(200).json({
      status: "OK",
      code: 200,
      message: "User subscription updated",
      data: {
        email: updatedUser.email,
        subscription: updatedUser.subscription,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const avatar = async (req, res) => {
  const user = req.user;
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "File not provided",
      });
    }

    const img = await jimp.read(req.file.path);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(req.file.path);

    await service.updateUserAvatar({
      email: user.email,
      avatarURL: `/avatars/${req.file.filename}`,
    });
    await img.writeAsync(path.join(avatarDir, req.file.filename));

    res.status(200).json({
      status: "OK",
      code: 200,
      message: "New avatar uploaded",
      data: {
        avatarURL: user.avatarURL,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
module.exports = {
  register,
  login,
  logout,
  current,
  subscription,
  avatar,
};
