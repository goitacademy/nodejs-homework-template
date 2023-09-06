const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User, schemas } = require("../models/user");

const { HttpError } = require("../helpers");
const { error } = require("console");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema.validate(req.body);
    if (error) {
      const missingFieldName = error.details[0].message;

      throw HttpError(400, missingFieldName);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: "Starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = schemas.loginSchema.validate(req.body);
    if (error) {
      const missingFieldName = error.details[0].message;

      throw HttpError(400, missingFieldName);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      const errMessage = "Email or password is wrong";
      HttpError(401, errMessage);
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token: token,
      user: {
        email: email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const { email, subscription } = req.user;
    console.log(subscription);

    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      const errMessage = "File is required!";
      throw HttpError(400, errMessage);
    }
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const fileName = `${_id}_${originalname}`;
    Jimp.read(originalname, (err, filename) => {
      if (err) throw err;
      filename
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(fileName);
    });

    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logOut,
  updateAvatar,
};
