const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db/userModel");
const {
  RegistrationConflictError,
  LoginAuthError,
  VerificationError,
  BadRequestError,
} = require("../helpers/errors");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const nodemailer = require("nodemailer");

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
const transporter = nodemailer.createTransport(config);

const signupUser = async (email, password) => {
  if (await User.findOne({ email })) {
    throw new RegistrationConflictError("Email is use");
  }

  const verificationToken = uuidv4();

  const user = new User({
    email,
    password,
    verificationToken,
  });

  await user.save();

  const emailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Please verify your email address",
    text: `Please verify your email address: http://localhost:3001/users/verify/${verificationToken}`,
  };
  await transporter.sendMail(emailOptions).catch((err) => console.log(err));

  return user;
};
const loginUser = async (email, password) => {
  const user = await User.find({ email, varify: true });

  if (!user) {
    throw new LoginAuthError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new LoginAuthError("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  await User.findByIdAndUpdate(user._id, { token }, { runValidators: true });

  return token;
};

const patchSubscriptionUser = async (id, subscription) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscription },
    { runValidators: true, new: true }
  ).select({ email: 1, subscription: 1, _id: 0 });
  return updatedUser;
};

const getCurrentUser = async (id) => {
  const data = await User.findById(id).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });
  return data;
};

const uploadUserAvatar = async (userId, filename) => {
  Jimp.read(path.resolve(`./tmp/${filename}`), (err, avatar) => {
    if (err) throw err;
    avatar
      .resize(250, 250)
      .quality(60)
      .greyscale()
      .write(path.resolve(`./public/avatars/${filename}`));
  });

  // ===================== Remove avatar-file form foulder tmp ==================
  fs.unlink(path.resolve(`./tmp/${filename}`), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  // ==============================================================================

  const avatarURL = `avatars/${filename}`;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatarURL },
    { runValidators: true, new: true }
  ).select({ avatarURL: 1, _id: 0 });
  return updatedUser;
};

const verificationUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new BadRequestError("Bad reques");
  }

  user.verificationToken = null;
  user.verify = true;
  await user.save();

  const emailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: user.email,
    subject: "Thank you for verifycation",
    text: `Well done. You profile verified.`,
  };
  await transporter.sendMail(emailOptions).catch((err) => console.log(err));
};

const repeatedVerifictaionUser = async (email) => {
  const user = await User.findOne({ email, varify: false });
  if (!user) {
    throw new VerificationError("Not found");
  }

  const { verificationToken } = user;
  const emailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Please verify your email address",
    text: `Please verify your email address: http://localhost:3001/users/verify/${verificationToken}`,
  };
  await transporter.sendMail(emailOptions).catch((err) => console.log(err));
};

module.exports = {
  signupUser,
  loginUser,
  patchSubscriptionUser,
  getCurrentUser,
  uploadUserAvatar,
  verificationUser,
  repeatedVerifictaionUser,
};
