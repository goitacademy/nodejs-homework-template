const { registerSchema } = require("../schemas");
const { loginSchema } = require("../schemas");
const { HttpError } = require("../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const User = require("../models/user");

dotenv.config();

const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

    res.status(201).json({
      user: newUser.email,
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });

    await User.findByIdAndUpdate(user._id, {token});

    res.json({
      token,
      user: email,
      email: email,
      subscription: subscription,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, name } = req.user;

    res.json({
      email,
      name,
    });
  } 
  catch (error) {
    next(error);
  }
};

const logout = async(req, res, next) => {
  try {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    res.json({
      message: "Logout success, No Content"
  })
  } 
  catch (error) {
    next(error);
  }
}

const updateAvatar = async(req, res, next)=> {
  try {
    console.log("avatar")
    const {path: tempUpload, originalname} = req.file;
    const {_id} = req.user;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
      avatarURL,
    })
  } 
  catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
