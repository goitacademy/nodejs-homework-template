const { User } = require("../models/user");
const { Unauthorized, BadRequest } = require("http-errors");
const { sendMail } = require("../helpers/index");
const path = require("path");
const fs = require("fs/promises");

async function logout(req, res, next) {
  const { user } = req;
  const userWithMovies = await User.findById(user._id);

  if (!userWithMovies) {
    throw Unauthorized("Not authorized");
  }

  await User.findByIdAndRemove(user._id);

  return res.status(204, "No Content").json(userWithMovies);
}

async function avatars(req, res, next) {
  const { filename } = req.file;
  const { user } = req;

  const userWithMovies = await User.findById(user._id);

  if (!userWithMovies) {
    throw Unauthorized("Not authorized");
  }

  const tmpPath = path.resolve(__dirname, "../tmp", filename);

  const publicPath = path.resolve(__dirname, "../public/avatars", filename);

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);

    throw Unauthorized("Not authorized");
  }

  const url = await User.findByIdAndUpdate(
    userWithMovies,
    {
      avatarURL: `/public/avatars/${filename}`,
    },
    { new: true }
  );
  return res.json({
    data: {
      avatarURL: url.avatarURL,
    },
  });
}

async function current(req, res, next) {
  const {
    user: { email, subscription },
  } = req;

  return res.status(200).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
}

async function verifyEmail(req, res, next) {
  const { token } = req.params;

  const userWithToken = await User.findOne({
    verificationToken: token,
  });

  if (!userWithToken) {
    throw BadRequest("User not found");
  }

  await User.findByIdAndUpdate(userWithToken._id, {
    verify: true,
    verificationToken: null,
  });

  return res.json({
    message: "Verification successful",
  });
}

async function repeatVerify(req, res, next) {
  const { email } = req.body;
  const { verificationToken } = req;

  const userWithEmail = await User.findOne({
    email,
  });

  if (!userWithEmail) {
    throw BadRequest("Missing required field email");
  }

  const userWithToken = await User.findByIdAndUpdate(
    userWithEmail,
    verificationToken
  );

  if (!userWithToken.verificationToken) {
    throw BadRequest("Verification has already been passed");
  }

  await sendMail({
    to: email,
    subject: "Please confirm your email",
    html: `<a href="localhost:3001/api/users/verify/${userWithToken.verificationToken}">Confirm your email</a>`,
  });

  res.status(201).json({
    message: "Verification email sent",
  });
}

module.exports = {
  avatars,
  current,
  logout,
  verifyEmail,
  repeatVerify,
};
