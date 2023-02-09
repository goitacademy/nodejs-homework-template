const { User } = require("../models/user");
const { HttpError, sendMail } = require("../helpers/helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const sgMail = require('@sendgrid/mail');
const { v4 } = require('uuid');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { SECRET_KEY} = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;
  const verifyToken = v4();

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarUrl = gravatar.url(email);
  try {
    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarUrl,
      verifyToken,
      verify: false,
    });

    await sendMail({
      to: email,
      subject: "please confirm your email",
      html: `<a href="localhost:3001/api/users/verify/${verifyToken}">confirm your email</a>`,
    });

    res.status(201).json({
      data: {
        user: {
          email,
          id: newUser._id,
        },
      },

      
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw new HttpError(409, "User with this email already exists");
    }

    throw error;
  }
}

async function login(req, res, next) {
  const { email, password} = req.body;
  const loginUser = await User.findOne({
    email, verify:true
  });
  if (!loginUser) {
    throw new HttpError(401, "email is not valid");
  }
  const isPasswordValid = await bcrypt.compare(password, loginUser.password);
  if (!isPasswordValid) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ id: loginUser._id }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return res.json({
    data: {
      token,
    },
  });
}

async function logout(req, res, next) {
  const { _id } = req.body;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
}

async function getCurrent(req, res, next) {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
}

async function uploadAvatar(req, res, next) {
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, "../tmp", filename);
  const publicPath = path.resolve(__dirname, "../public", filename);
  const avatarUrl = path.join("avatar", filename);
 
  try {
    await fs.rename(tmpPath, publicPath);
    const userId = req.params.id;
    Jimp.read(avatarUrl)
  .then(filename => {
    return filename
      .resize(250, 250) 
      .write(avatarUrl); 
  })
  .catch( error => {
    throw error;
  });
  await User.findByIdAndUpdate(userId, { avatarUrl });
  return res.json({
    message: "Avatar updated",
  });
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
  

}

const verificationUser = async (req, res) => {

}

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  uploadAvatar,
  verificationUser
};