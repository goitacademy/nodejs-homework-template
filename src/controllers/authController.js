const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { BadRequest, Conflict, Unauthorized } = require("http-errors");

const { joiSignupSchema, joiLoginSchema } = require("../models/userModel");
const { User } = require("../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const { SECRET_KEY } = process.env;

const signupController = async (req, res, next) => {
  try {
    const { body } = req;
    const { name, email, password, subscription } = req.body;
    const { error } = joiSignupSchema.validate(body);

    if (error) {
      throw new BadRequest(error.message);
    }

    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict("Email in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL,
      subscription,
    });
    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        // password: newUser.password,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = req.body;
    const { error } = joiLoginSchema.validate(body);

    if (error) {
      throw new BadRequest(error.message);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    // const passwordCompare = user.comparePassword(password);

    if (!passwordCompare) {
      throw new Unauthorized("Email or password is wrong");
    }

    const { _id, subscription } = user;
    const payload = {
      id: _id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(_id, { token });

    res.json({
      token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
};

const currentController = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    user: {
      email,
      subscription,
    },
  });
};

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, filename } = req.file;

    const image = await Jimp.read(tempUpload);
    image.resize(250, 250).writeAsync(tempUpload);

    const [extension] = filename.split(".").reverse();
    const newFileName = `${_id}.${extension}`;
    const fileUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, fileUpload);
    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    // const { path: tempUpload } = req.file;
    // await fs.unlink(tempUpload);

    next(error);
  }
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentController,
  updateAvatar,
};
