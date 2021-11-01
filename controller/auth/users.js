const mongoose = require("mongoose");
const { NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");
const Users = require("../../model/user");
const User = require("../../schemas/users");
const { Unauthorized } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const gravatar = require("gravatar");
// const { nanoid } = require("nanoid");

const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");
const { token } = require("morgan");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const verifyToken = uuidv4();
    console.log(verifyToken);
    const user = await Users.findByEmail(email);
    if (user) {
      return next({
        status: 409,
        message: "Email in use",
      });
    }
    const newUser = await Users.createVerify(email, password, verifyToken);
    console.log(newUser);
    const mail = {
      to: email,
      subject: "Подтверждение регистрации на сайте",
      html: `
        <a target="_blank"
            href="http://localhost:3000/api/auth/verify/${verifyToken}">Нажмите для подтверждения email</a>
        `,
    };
    sendEmail(mail);

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
        verifyToken: newUser.verifyToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    if (!user || !user.verify) {
      throw new Unauthorized("Email or password is wrong, or email not verify");
    }
    const isValidPassword = await user.validPassword(password);
    // || !user.verify
    if (!user || !isValidPassword) {
      throw new Unauthorized("Email or password is wrong,or email not verify");
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, _next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(204).json({});
};

const currentUser = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await Users.findById(id);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const uploadDir = path.join(__dirname, "../../", "public");
const updateAvatar = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Unauthorized("Not authorized");
  }
  const { originalname, path: tempDir } = req.file;
  const user = await Users.findByToken(token);
  const id = user._id;
  try {
    const newImageName = `${Date.now().toString()}-${req.file.originalname}`;
    const originalImage = await Jimp.read(tempDir);
    const resizedImage = await originalImage.cover(250, 250);
    await resizedImage.write(`${uploadDir}/avatars/${newImageName}`);
    fs.unlink(tempDir);
    const avatar = path.join("/avatars", newImageName);
    await Users.updateAvatar(id, avatar);
    res.json({
      status: "success",
      code: 201,
      message: "Update avatar success",
      data: {
        user: {
          avatarURL: avatar,
        },
      },
    });
  } catch (error) {
    fs.unlink(tempDir);
    console.log(error);
  }
};

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await Users.findByVerificationToken(verificationToken);
  if (!user) {
    return next({
      status: 404,
      message: "User not found",
    });
  }
  const id = user._id;
  await Users.updateVerificationToken(user._id, true, "null");
  return res.json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};
// console.log(verify());
const reSend = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      code: 400,
      message: "missing required field email",
    });
  }

  // const user = await User.findOne({ email });
  const user = await Users.findByEmail(email);
  if (!user) {
    throw new NotFound("User not found");
  }
  console.log(user.verify);
  if (user.verify) {
    return res.json({
      status: "success",
      code: 400,
      message: "Verification has already been passed",
    });
  }
  const verifyEmail = {
    to: email,
    subject: "Verify your email to finish registration",
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verifyToken}" target="_blank">Confirm email<a>`,
  };

  await sendEmail(verifyEmail);
  return res.json({
    status: "success",
    code: 201,
  });
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateAvatar,
  verify,
  reSend,
};
