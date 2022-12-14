const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
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
  // console.log(req);
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
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "vladdanya08@gmail.com",
    subject: "Verifying mail",
    text: `Please, follow the forward link and verify your account localhost:3030/api/users/verify/${verifyCode}`,
    html: `<strong>Please, follow the forward <a href="localhost:3030/api/users/verify/${verifyCode}">link</a> and verify your account</strong>`,
  };
  try {
    const incryptedPassword = incryptPassword(password);
    await User.create({
      password: incryptedPassword,
      email,
      avatarURL: avatarUrl,
      verificationToken: verifyCode,
    });
    await sgMail.send(msg);
    return res.status(201).json({
      data: { email },
      status: "201 Created",
      message: "Check your email and verify account !",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!isValidPassword(password, user.password)) {
    return res.status(401).json({
      message: "Email or password is wrong",
      status: "401 Unauthorized",
    });
  } else if (!user) {
    return res.status(404).json({
      message: "User was not found",
      status: "404 Not Found",
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
  logOut,
};
