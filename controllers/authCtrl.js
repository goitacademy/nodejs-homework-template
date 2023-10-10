const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

require("dotenv").config();

const { User, schemas } = require("../models/userModel");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);
    const avatarURL = await Jimp.read(avatar)
      .then((avatar) => {
        return avatar.resize(250, 250);
      })
      .catch((error) => {
        next(error);
      });

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    return res.status(201).json({
      email: newUser.email,
      password: hashPassword,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "Logout success" });
};

const updateSubscription = async (req, res, next) => {
  const { body } = req;
  const { _id: owner } = req.user;
  try {
    const { error } = schemas.subSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    if (!body?.subscription) {
      throw HttpError(400, "missing field subscription");
    }
    const updatedSub = await User.findByIdAndUpdate(owner, body, {
      new: true,
    });
    if (!updatedSub) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json(updatedSub);
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  console.log(req.file);
  const { _id } = req.user;
  try {
    if (!req.file.mimetype.startsWith("image/")) {
      throw HttpError(400, "Please, upload images only!!");
    }
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    Jimp.read(tempUpload)
      .then((avatar) => {
        avatar.resize(250, 250).quality(90).writeAsync(resultUpload);
        // fs.rename(tempUpload, resultUpload);
      })
      .catch((error) => {
        throw HttpError(400, error);
      });

    fs.unlink(tempUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
