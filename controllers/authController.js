const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const fs = require("node:fs/promises");
const path = require("node:path");
const gravatar = require("gravatar");
const jimp = require("jimp");

//register function
async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (user !== null) {
      return res.status(409).send({ message: "user already register!" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      email,
      password: passwordHash,
      avatarURL,
    });
    res.status(201).send({
      user: {
        email: email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
}

//login function
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (email === undefined || password === undefined) {
      return res.status(400).send({ message: "missing some fields" });
    }
    const user = await User.findOne({ email }).exec();
    if (user === null) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const loginUser = await User.findByIdAndUpdate(user._id, { token });

    return res.send({
      token: token,
      user: {
        email: email,
        subscription: loginUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
  res.send("OK");
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null }).exec();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const user = await User.findById(req.user._id).exec();
    return res.status(200).send({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
}

async function uploadAvatar(req, res, next) {
  try {
    if (req.file !== undefined) {
      await jimp.read(req.file.path).then((img) => {
        return img.cover(250, 250).write(req.file.path);
      });
      await fs.rename(
        req.file.path,
        path.join(__dirname, "..", "public/avatars", req.file.filename)
      );
      avatarURL = req.file.filename;
    } else {
      avatarURL = gravatar.url(req.user.email);
    }
    const result = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatarURL: avatarURL,
      },
      { new: true }
    ).exec();
    if (result === null) {
      return res.status(404).send({ message: "user not found" });
    }
    res.send({ avatarURL: result.avatarURL });
  } catch (error) {
    next(error);
  }
}
//

module.exports = { register, login, logout, current, uploadAvatar };
