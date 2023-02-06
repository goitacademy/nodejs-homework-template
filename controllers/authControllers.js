const path = require("path");
const fs = require("fs/promises");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

require("dotenv").config();
const SECRET_KEY = process.env.SECRET;

const { User } = require("../models/userModels");

const ctrlSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        code: 409,
        message: "Email in use",
      });
    }

    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({ name, email, password: hashPassword, avatarURL });

    res.json({
      status: "Created",
      code: 201,
      message: "Registration successful",
      data: {
        user: {
          name,
          email,
          avatarURL,
        },
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!user || !validPassword) {
      return res.status(401).json({
        code: 401,
        message: "Email or password is wrong",
      });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlCurrent = async (req, res, next) => {
  try {
    const { name, email, subscription } = req.user;

    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          name,
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlLogout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: null });

    if (!user) {
      unauthorized(res);
    }

    res.status(204).json({
      status: "No content",
      code: 204,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlUpdateCurrent = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { _id } = req.user;

    await User.findByIdAndUpdate({ _id }, { $set: { subscription } });

    res.json({
      status: "subscription updated",
      code: 200,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const ctrlUpdateAvatart = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({
      status: "avatar updated",
      code: 200,
      avatar: avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);

    console.log(error.message);
    next(error);
  }
};

module.exports = {
  ctrlSignup,
  ctrlLogin,
  ctrlCurrent,
  ctrlLogout,
  ctrlUpdateCurrent,
  ctrlUpdateAvatart,
};
