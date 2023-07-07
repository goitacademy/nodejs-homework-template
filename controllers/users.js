const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, schemas } = require("../models/user");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.signUpSchema.validate(req.body);
    if (error) {
      throw HttpError(400, (message = "Invalid field value"));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
        ...req.body,
      password: hashedPassword,
      avatarURL

    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = schemas.loginSchema.validate(req.body);
    if (error) {
      throw HttpError(400, (message = "Invalid field value"));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    };
    console.log(payload);
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "6d" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.sendStatus(204)
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;

    const resultUpload = path.join(avatarsDir, filename);

    const image = await Jimp.read(tempUpload);
    image.resize(250, 250).write(resultUpload);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL: avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar
};