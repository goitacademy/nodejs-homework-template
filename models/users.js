const jwt = require("jsonwebtoken");
const sendMailService = require("../services/sendMail/sendMail");
const fs = require("fs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const User = require("../services/userSchema");
require("dotenv").config();
const secret = process.env.SECRET;
const path = require("path");

const {
  isValidPassword,
  incryptPassword,
} = require("../middleware/validatePassword");

const upatePath = path.resolve("./public/avatars");
const destinationPath = path.resolve("./tmp");

const avatarPatchController = async (req, res, next) => {
  const tmpFile = path.join(destinationPath, req.file.originalname);
  try {
    // Чтение файла из tmp
    const newAvatar = await Jimp.read(tmpFile);
    // Очистка папки public/avatar перед заменой аватара
    await fs.readdir(upatePath, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(upatePath, file), (err) => {
          if (err) throw next(err);
        });
      }
    });
    // Замена аватара
    newAvatar.resize(250, 250).write(`${upatePath}/${req.file.originalname}`);
    return res.status(200).json({ test: "200 OK" });
  } catch (error) {
    next(error);
  } finally {
    await fs.unlink(tmpFile, (err) => {
      if (err) throw next(err);
    });
  }
};

const registration = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  // Есть ли юзер в БД
  if (user) {
    return res
      .status(409)
      .json({ message: "Email in use", status: "409 Conflict" });
  }
  // Оказалось что он есть и мы можем создать для него токен, аватар и письмо с подтвердением
  const avatarUrl = gravatar.url(email, { protocol: "https" });
  const verifyCode = uuidv4();
  const mailText = `Please, follow the forward link and verify your account, or make GET fetch on localhost:3030/api/users/verify/${verifyCode}`;
  const mailSubject = "Verifying mail";
  try {
    await sendMailService(mailSubject, mailText, email);
    const incryptedPassword = incryptPassword(password);
    await User.create({
      password: incryptedPassword,
      email,
      avatarURL: avatarUrl,
      verificationToken: verifyCode,
    });
    return res.status(201).json({
      data: { email },
      status: "201 Created",
      message: "Check your email and verify account !",
    });
  } catch (error) {
    next(error);
  }
};

const registrationVerification = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({ status: "404 Not Found" });
  }
  try {
    user.verify = true;
    user.verificationToken = "0";
    await user.save();
    return res
      .status(200)
      .json({ status: "200 OK", message: "user successfully verifyed" });
  } catch (error) {
    next(error);
  }
};

const forcedVerification = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User was not found",
      status: "404 Not Found",
    });
  } else if (user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
      status: "400 Bad Request",
    });
  }
  const mailText = `Please, follow the forward link and verify your account, or make GET fetch on localhost:3030/api/users/verify/${user.verificationToken}`;
  const mailSubject = "Verifying mail";
  try {
    await sendMailService(mailSubject, mailText, email);
    return res.status(200).json({
      status: "200 OK",
      message: "Check your email and verify account !",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user.verify) {
    return res.status(401).json({
      message: "User was not verifyed",
      status: "401 Not Verifyed",
    });
  } else if (!user) {
    return res.status(404).json({
      message: "User was not found",
      status: "404 Not Found",
    });
  } else if (!isValidPassword(password, user.password)) {
    return res.status(401).json({
      message: "Email or password is wrong",
      status: "401 Unauthorized",
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.status(200).json({
    status: "200 OK",
    data: {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
  await User.findOneAndUpdate({ email }, { token });
};

const getCurrentUserInfo = async (req, res, next) => {
  const { email, subscription } = req.user;
  try {
    return res
      .status(200)
      .json({ data: { email, subscription }, status: "200 OK" });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  const { email } = req.user;
  try {
    await User.findOneAndUpdate({ email }, { token: null });
    return res.status(204).json({ status: "204 No Connect" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  avatarPatchController,
  registration,
  login,
  getCurrentUserInfo,
  registrationVerification,
  forcedVerification,
  logOut,
};
