require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../service/schemas/user");
const service = require("../service/users");
const { userValidator } = require("./../utils/validator");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { imageStore } = require("../middlewares/upload");

const SECRET = process.env.SECRET;

const register = async (req, res, next) => {
  const { error } = userValidator(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });
  const { email, password, subscription } = req.body;
  const user = await service.getUser({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    const newUser = new User({ email, password, subscription, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  const { error } = userValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  const user = await service.getUser({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Incorrect email or password",
      data: "Unauthorized",
    });
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

  try {
    await User.findByIdAndUpdate(user._id, { token });

    return res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await service.getUser({ _id: req.user._id });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      user.setToken(null);
      await user.save();
      res.json({
        status: "success",
        code: 204,
        data: {
          message: "No content",
        },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = await service.getUser({ _id: req.user._id });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    } else {
      res.json({
        status: "success",
        code: 200,
        data: {
          user,
        },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  const { email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${email}`,
    },
  });
};

const updateSubscription = async (req, res, next) => {
  try {
    const { error } = userValidator(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { subscription } = req.params;

    if (!subscription) {
      res.status(400).json({ message: "Missing subscription field" });
    }
    const user = await service.updateUserSubscription(userId, subscription);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "There is no file" });
  }
  const { description } = req.body;
  const { path: temporaryName } = req.file;
  const fileName = path.join(imageStore, req.file.fileName);

  const newUser = await service.updateUserAvatar(req.body.id, fileName);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }

  const isValid = await isCorrectResizedImage(fileName);
  if (!isValid) {
    await fs.unlink(fileName);
    return res
      .status(400)
      .json({ message: "File isn't a photo or problem with resizing" });
  }

  res.json({
    description,
    fileName,
    avatarURL: newUser.avatarURL,
    message: "File uploaded correctly",
    status: 200,
  });
};

const isCorrectResizedImage = async (imagePath) =>
  new Promise((resolve) => {
    try {
      Jimp.read(imagePath, (error, image) => {
        if (error) {
          resolve(false);
        } else {
          image.resize(250, 250).write(imagePath);
          resolve(true);
        }
      });
    } catch (error) {
      resolve(false);
    }
  });

const deleteUserByMail = async (req, res) => {
  try {
    const email = req.query.email;
    const userToRemove = await service.deleteUser(email);
    if (!userToRemove) {
      return res.status(404).json({ message: "Not found user" });
    } else {
      res.status(200).json({ message: "User deleted from data base" });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
  getUsers,
  updateSubscription,
  updateAvatar,
  deleteUserByMail,
};
